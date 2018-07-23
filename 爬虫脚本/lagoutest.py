#!/usr/bin/env python
# -*- coding:utf-8 -*-
from lagou import login,get_cookies,fetch_detail,fetch

if __name__ == "__main__":
    username = ''
    passwd = ''
    login(username, passwd)
    cookies = get_cookies()
    print(cookies)
    try:
        # 同步session
        url = 'https://m.lagou.com/listmore.json?pageNo=1&pageSize=10'
        headers = {}
        print("数据如下")
        data = fetch(url,headers=headers,cookies=cookies)
        print(data)
    except Exception as e:
        print(e)
