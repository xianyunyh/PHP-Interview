import requests
import json
import redis
from pyquery import PyQuery as pq

"""
获取职位列表
"""
def fetch(url,headers={}):
    #用户登录后的cookie
    try:
        res = requests.get(url,headers=headers)
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
                res = fetchDetail(positionId,headers=headers)
                r.hmset("postion:"+str(positionId),res)
                print(str(positionId)+"已经写入redis中")
            r.hmset(key,t)

# 获取职位详情
def fetchDetail(id,headers={}):
    detailUrl = 'http://m.lagou.com/jobs/'+str(id)+".html"
    res = requests.get(detailUrl,headers=headers)
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

if __name__ == '__main__':

    #职位列表的json接口 需要登陆 带cookie
    page = 1
    pageSize = 100#最大支持100
    API_URL = 'http://m.lagou.com/listmore.json?pageNo='+str(page)+'&pageSize='+str(pageSize)
    #cookie替换成自己登录后的cookie
    cookie = 'Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1531361076,1532319384; LGUID=20180723131853-e4343a35-8e37-11e8-9ee6-5254005c3644; LGSID=20180723135216-8dffe0ce-8e3c-11e8-a327-525400f775ce; PRE_UTM=; PRE_HOST=; PRE_SITE=; PRE_LAND=https%3A%2F%2Fpassport.lagou.com%2Flogin%2Flogin.html; LG_LOGIN_USER_ID=564f3b59e53c65db601e411a55fa01278ce7cf79cb588be8; _putrc=51AF6FA824D5BE21; login=true; unick=%E7%94%B0%E9%9B%B7; gate_login_token=a47b874276333f9f31e46da6185e63a0935573d160846c4d; _gat=1; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1532325155; LGRID=20180723135240-9c59f5b7-8e3c-11e8-a327-525400f775ce'
    headers = {'user-agent': 'my-app/0.0.1','cookie':cookie}

    data = fetch(API_URL,headers=headers)
    insert(data)



