import  requests
from pyquery import PyQuery as pq
headers = {
    "x-requested-with":"XMLHttpRequest",
    "user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
}

session  =requests.session()

def fetch_list(url):
    response = session.get(url,headers=headers)
    if response.status_code != 200:
        print("请求失败"+response.text)
        exit(-1)
    data = response.json()
    html = (data['html'])
    q = pq(html)
    temp = {}
    result = []
    for x in q(".item"):
        temp['detail_url'] = 'https://www.zhipin.com'+q(x).find('a').attr('href')
        temp['title'] = q(x).find("h4").text()
        temp['salary'] = q(x).find('.salary').text()
        temp['company'] = q(x).find('.name').text()
        temp['city'] = q(x).find('.msg em').eq(0).text()
        temp['workyear'] = q(x).find('.msg em').eq(1).text()
        temp['collect'] = q(x).find('.msg em').eq(2).text()
        result.append(temp)
    return result


def fetch_boss_detail(url):
    response = requests.get(url,headers=headers)
    if response.status_code != 200:
        print(url+"抓取失败")
    else:
        result = {}
        body = response.text
        q = pq(body)

        result['salary'] = q(".salary").text()
        all = q('.job-banner p').text().split(" ")
        result['city'] = all[0]
        result['workyear'] = all[1]
        result['educational'] =all[2]
        result['name'] = (q('.job-banner .name').text().split(" "))[0]
        result['create_time'] = q('.job-tags .time').text()
        result['body'] = q('.text').text()
        result['location-address'] = q('.location-address').text()
        if "工作职责" in result['body']:
            print(1)
        return result
    pass


#上海PHP
url = 'https://www.zhipin.com/mobile/jobs.json?page=3&city=101020100&query=PHP'
detail_url = 'https://www.zhipin.com/job_detail/3b31d8738e6d77421Xd_3tu4F1Q~.html'
data = fetch_boss_detail(detail_url)
print(data)
