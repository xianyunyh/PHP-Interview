import requests
import json
import redis
from pyquery import PyQuery as pq
import hashlib
import re

#请求对象
session = requests.session()

#请求头信息
HEADERS = {
    'Referer': 'https://passport.lagou.com/login/login.html',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:51.0) Gecko/20100101 Firefox/51.0',
}
headers = {}
cookies = {}

def get_password(passwd):
    '''这里对密码进行了md5双重加密 veennike 这个值是在main.html_aio_f95e644.js文件找到的 '''
    passwd = hashlib.md5(passwd.encode('utf-8')).hexdigest()
    passwd = 'veenike' + passwd + 'veenike'
    passwd = hashlib.md5(passwd.encode('utf-8')).hexdigest()
    return passwd

def get_token():
    Forge_Token = ""
    Forge_Code = ""
    login_page = 'https://passport.lagou.com/login/login.html'
    data = session.get(login_page, headers=HEADERS)
    match_obj = re.match(r'.*X_Anti_Forge_Token = \'(.*?)\';.*X_Anti_Forge_Code = \'(\d+?)\'', data.text, re.DOTALL)
    if match_obj:
        Forge_Token = match_obj.group(1)
        Forge_Code = match_obj.group(2)
    return Forge_Token, Forge_Code

def login(username, passwd):
    X_Anti_Forge_Token, X_Anti_Forge_Code = get_token()
    login_headers = HEADERS.copy()
    login_headers.update({'X-Requested-With': 'XMLHttpRequest', 'X-Anit-Forge-Token': X_Anti_Forge_Token, 'X-Anit-Forge-Code': X_Anti_Forge_Code})
    postData = {
            'username': username,
            'password': get_password(passwd),
            'request_form_verifyCode': '',
            'submit': '',
        }
    response = session.post('https://passport.lagou.com/login/login.json', data=postData, headers=login_headers)
    json_data = response.json()
    if(json_data['state'] != 1):
        print("登录失败，退出")
        exit(-1)

def get_cookies():
    session.get("https://passport.lagou.com/grantServiceTicket/grant.html")
    return requests.utils.dict_from_cookiejar(session.cookies)

"""
获取职位列表
"""
def fetch(url,headers,cookies):
    #用户登录后的cookie
    try:
        res = session.get(url,headers=headers,cookies=cookies)
    except Exception as e:
        print(e)
        return False

    if res.status_code != 200:
        print("接口请求出错"+str(res.text))
        return False

    jsons = (res.json())
    try:
        data = (jsons['content']['data']['page']['result'])
    except Exception as e:
        print(e)
        return False
    return data

"""
插入数据到redis
"""
def insert(data):
    pool= redis.ConnectionPool(host='localhost',port=6379,decode_responses=True)
    r=redis.Redis(connection_pool=pool)
    if data is not False:
        for t in data:
            #公司id
            id  = t['companyId']
            key = "companyId:"+str(id)
            #职位id
            positionId = t['positionId']
            #公司的id加入集合中去重
            resA = r.sadd("company",id)

            if resA == 1:
                res = fetch_detail(positionId,headers,cookies)
                r.hmset("postion:"+str(positionId),res)
                print(str(positionId)+"已经写入redis中")
            r.hmset(key,t)

# 获取职位详情
def fetch_detail(id,headers,cookies):
    detailUrl = 'http://m.lagou.com/jobs/'+str(id)+".html"
    res = session.get(detailUrl,headers=headers,cookies=cookies)
    if res.status_code != 200:
        print("请求出错"+str(res.text))
        return False
    html = res.text
    q = pq(html)
    d = {}
    d['title'] = q(".postitle h2").text()
    d['salary'] = q(".salary").text()
    d['workaddress'] = q(".workaddress").text()
    d['workyear'] = q('.workyear').text()
    d['education'] = q('.education').text()
    d['company']  = q('.dleft h2').text()
    d['positiondesc'] = q('.positiondesc').text()
    return d
    # print(q(".content").text())





