import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'PHP面试知识整理',
  description: 'PHP、MySQL、Linux、计算机网络、数据结构与算法、设计模式等面试知识整理',
  lang: 'zh-Hans',
  base: '/PHP-Interview/',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: false,

  // README.md 在各目录中充当首页，重写为 index.md 以便 /目录/ 可以直接访问
  // 根目录的 README.md 排除在构建之外，改用独立的 index.md 作为站点首页
  srcExclude: ['README.md', 'SUMMARY.md'],
  rewrites: {
    'Linux/README.md': 'Linux/index.md',
    '操作系统/README.md': '操作系统/index.md',
    'Mysql/README.md': 'Mysql/index.md',
    '计算机网络/README.md': '计算机网络/index.md',
    '版本控制器/README.md': '版本控制器/index.md',
    '数据结构/README.md': '数据结构/index.md',
    '算法/README.md': '算法/index.md',
    'MQ/README.md': 'MQ/index.md',
    'PHP/README.md': 'PHP/index.md',
    'PHP/PHP手册笔记/README.md': 'PHP/PHP手册笔记/index.md',
    '设计模式/README.md': '设计模式/index.md',
    '架构和系统设计/README.md': '架构和系统设计/index.md',
    '面试/README.md': '面试/index.md',
  },

  head: [['link', { rel: 'icon', href: '/PHP-Interview/favicon.svg' }]],

  themeConfig: {
    logo: '/favicon.svg',
    outline: {
      level: [2, 3],
      label: '本页目录',
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    lastUpdatedText: '最后更新',

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },

    nav: [
      { text: '首页', link: '/' },
      {
        text: 'LNMP',
        items: [
          { text: 'Linux', link: '/Linux/' },
          { text: 'MySQL', link: '/Mysql/' },
          { text: 'MongoDB', link: '/MongoDb/MongoDB' },
          { text: 'PHP', link: '/PHP/' },
        ],
      },
      {
        text: '操作系统与网络',
        items: [
          { text: '操作系统', link: '/操作系统/' },
          { text: '计算机网络', link: '/计算机网络/' },
          { text: '版本控制器', link: '/版本控制器/' },
        ],
      },
      {
        text: '数据结构与算法',
        items: [
          { text: '数据结构', link: '/数据结构/' },
          { text: '算法', link: '/算法/' },
        ],
      },
      {
        text: '架构与设计',
        items: [
          { text: '架构和系统设计', link: '/架构和系统设计/' },
          { text: '设计模式', link: '/设计模式/' },
          { text: '消息队列', link: '/MQ/' },
          { text: '缓存系统', link: '/Cache/Redis' },
        ],
      },
      { text: '面试', link: '/面试/' },
      { text: 'GitHub', link: 'https://github.com/xianyunyh/PHP-Interview' },
    ],

    sidebar: {
      '/Linux/': [
        {
          text: 'Linux / LNMP',
          items: [
            { text: '概述', link: '/Linux/' },
            { text: 'Linux基本操作命令', link: '/Linux/Linux命令' },
            { text: 'Linux网络相关命令', link: '/Linux/Linux命令2' },
            { text: 'Crontab计划任务', link: '/Linux/crontab' },
            { text: 'Inode介绍', link: '/Linux/inode' },
            { text: 'Shell入门教程', link: '/Linux/shell' },
            { text: 'Sed命令', link: '/Linux/Sed' },
            { text: 'Awk命令', link: '/Linux/AWK' },
            { text: 'Linux IO模型', link: '/Linux/LinuxIO模型' },
            { text: 'Vim编辑器', link: '/Linux/Vim' },
            { text: 'Nginx', link: '/Linux/Nginx' },
            { text: 'LAMP/LNMP环境搭建', link: '/Linux/lanmp' },
          ],
        },
      ],
      '/操作系统/': [
        {
          text: '操作系统',
          items: [
            { text: '操作系统概论', link: '/操作系统/' },
            { text: '进程和线程的区别', link: '/操作系统/进程和线程' },
          ],
        },
      ],
      '/Mysql/': [
        {
          text: 'MySQL',
          items: [
            { text: '概述', link: '/Mysql/' },
            { text: 'SQL标准', link: '/Mysql/SQL标准' },
            { text: '数据库三范式', link: '/Mysql/MySQL三范式' },
            { text: '常用数据类型整理', link: '/Mysql/mysql' },
            { text: '存储引擎', link: '/Mysql/存储引擎' },
            { text: '事务', link: '/Mysql/事务' },
            { text: '锁', link: '/Mysql/锁' },
            { text: '索引', link: '/Mysql/索引' },
            { text: 'explain分析SQL', link: '/Mysql/explain' },
            { text: 'MySQL优化', link: '/Mysql/MySQL优化' },
            { text: 'MySQL索引原理及慢查询优化', link: '/Mysql/MySQL索引原理及慢查询优化' },
          ],
        },
        { text: 'MongoDB', items: [{ text: 'MongoDB / NoSQL', link: '/MongoDb/MongoDB' }] },
      ],
      '/MongoDb/': [
        { text: 'MongoDB', items: [{ text: 'MongoDB / NoSQL', link: '/MongoDb/MongoDB' }] },
      ],
      '/计算机网络/': [
        {
          text: '计算机网络',
          items: [
            { text: '概述', link: '/计算机网络/' },
            { text: 'IP协议', link: '/计算机网络/IP协议' },
            { text: 'TCP协议', link: '/计算机网络/TCP协议' },
            { text: 'UDP协议', link: '/计算机网络/UDP协议' },
            { text: 'HTTP协议', link: '/计算机网络/HTTP协议' },
            { text: 'HTTPS协议', link: '/计算机网络/HTTPS' },
            { text: 'HTTP2协议', link: '/计算机网络/HTTP2' },
            { text: 'Websocket协议', link: '/计算机网络/Webscokt' },
          ],
        },
      ],
      '/版本控制器/': [
        {
          text: '版本控制器',
          items: [
            { text: '概述', link: '/版本控制器/' },
            { text: 'Git', link: '/版本控制器/Git' },
            { text: 'Git 移除中间提交', link: '/版本控制器/Git_removeCommits' },
          ],
        },
      ],
      '/数据结构/': [
        {
          text: '数据结构',
          items: [
            { text: '概述', link: '/数据结构/' },
            { text: '数组', link: '/数据结构/数组' },
            { text: '链表', link: '/数据结构/链表' },
            { text: '堆栈', link: '/数据结构/堆栈' },
            { text: '散列表', link: '/数据结构/散列表' },
            { text: '字符串', link: '/数据结构/字符串' },
            { text: '二叉树基本操作', link: '/数据结构/二叉树基本操作' },
            { text: 'Leetcode经典二叉树题目集合', link: '/数据结构/Leetcode经典二叉树题目集合' },
          ],
        },
      ],
      '/算法/': [
        {
          text: '算法',
          items: [
            { text: '概述与排序/查找算法', link: '/算法/' },
            { text: '二分查找', link: '/算法/二分查找' },
            { text: '动态规划', link: '/算法/动态规划' },
          ],
        },
      ],
      '/架构和系统设计/': [
        {
          text: '架构和系统设计',
          items: [
            { text: '概述', link: '/架构和系统设计/' },
            { text: 'API设计（REST）', link: '/架构和系统设计/API设计' },
          ],
        },
      ],
      '/设计模式/': [
        {
          text: '设计模式',
          items: [
            { text: '概述', link: '/设计模式/' },
            { text: '创建型模式', link: '/设计模式/Creational' },
            { text: '结构型模式', link: '/设计模式/Structural' },
            { text: '行为型模式', link: '/设计模式/Behavioral' },
          ],
        },
      ],
      '/MQ/': [
        {
          text: '消息队列',
          items: [
            { text: '概述', link: '/MQ/' },
            { text: 'RabbitMQ', link: '/MQ/rabbitmq' },
            { text: '消息队列常见面试题', link: '/MQ/question' },
          ],
        },
      ],
      '/Cache/': [
        { text: '缓存系统', items: [{ text: 'Redis', link: '/Cache/Redis' }] },
      ],
      '/PHP/': [
        {
          text: 'PHP',
          items: [
            { text: '概述', link: '/PHP/' },
            { text: 'PHP7新特性', link: '/PHP/php7' },
            { text: 'PHP运行原理', link: '/PHP/PHP运行原理' },
            { text: 'Zval结构', link: '/PHP/PHP-Zval结构' },
            { text: 'HashTable', link: '/PHP/PHP7-HashTable' },
            { text: 'PHP-FPM配置选项', link: '/PHP/PHP-FPM配置选项' },
            { text: '正则表达式', link: '/PHP/正则表达式' },
            { text: 'PHP8新特性', link: '/PHP/PHP8' },
            { text: 'PHP8.1新特性', link: '/PHP/PHP8.1' },
            { text: 'PHP8.2新特性', link: '/PHP/PHP8.2' },
          ],
        },
        {
          text: 'PHP手册笔记',
          items: [
            { text: '概述', link: '/PHP/PHP手册笔记/' },
            { text: '0. PHP在Unix平台安装', link: '/PHP/PHP手册笔记/0.php在unix平台安装' },
            { text: '1. 基本语法', link: '/PHP/PHP手册笔记/1.基本语法' },
            { text: '2. 变量和常量', link: '/PHP/PHP手册笔记/2-变量和常量' },
            { text: '3. 运算符', link: '/PHP/PHP手册笔记/3-运算符' },
            { text: '4. 流程控制', link: '/PHP/PHP手册笔记/4.流程控制' },
            { text: '5. 函数', link: '/PHP/PHP手册笔记/5.函数' },
            { text: '6. 面向对象（OOP）上', link: '/PHP/PHP手册笔记/6.面向对象(OOP)' },
            { text: '7. 面向对象（OOP）中', link: '/PHP/PHP手册笔记/7.面向对象(OOP)' },
            { text: '8. 面向对象（OOP）下', link: '/PHP/PHP手册笔记/8.面向对象（OOP）' },
            { text: '9. 命名空间', link: '/PHP/PHP手册笔记/9.命名空间' },
            { text: '10. 错误和异常处理', link: '/PHP/PHP手册笔记/10.错误和异常处理' },
          ],
        },
      ],
      '/面试/': [
        {
          text: '面试沟通',
          items: [
            { text: '概述', link: '/面试/' },
            { text: '离职原因回答', link: '/面试/01离职原因回答' },
            { text: '写简历', link: '/面试/02写简历' },
            { text: '裸辞应对', link: '/面试/03裸辞应对' },
            { text: '面试提问', link: '/面试/04面试提问' },
            { text: '谈薪资', link: '/面试/05谈薪资' },
          ],
        },
        {
          text: '笔试题 / 面试题',
          items: [
            { text: '笔试题1', link: '/面试/笔试题' },
            { text: '笔试题2', link: '/面试/笔试题2' },
            { text: '笔试题3', link: '/面试/笔试题3' },
            { text: '笔试题4', link: '/面试/笔试题4' },
            { text: '面试题5', link: '/面试/面试题5' },
            { text: '面试题6', link: '/面试/面试题6' },
            { text: '面试总结', link: '/面试/面试总结' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/xianyunyh/PHP-Interview' }],

    footer: {
      message: '基于 VitePress 构建 · 欢迎 Star 与 PR',
      copyright: 'Copyright © xianyunyh',
    },
  },
})
