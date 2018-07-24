
import matplotlib.pyplot as plt     #数学绘图库
import jieba               #分词库
from wordcloud import WordCloud   #词云库
import  jieba.analyse

def stopwordslist(filepath):
    stopwords = [line.strip() for line in open(filepath, 'r', encoding='utf-8').readlines()]
    return stopwords

# 对句子去除停用词
def movestopwords(sentence):
    stopwords = stopwordslist('stop.txt')  # 这里加载停用词的路径
    outstr = ''
    for word in sentence:
        if word not in stopwords:
            if word != '\t'and'\n':
                outstr += word
                # outstr += " "
    return outstr


#1、读入txt文本数据
text = open(r'lz.txt',"r").read()
text = movestopwords(text)
#2、结巴分词，默认精确模式。可以添加自定义词典userdict.txt,然后jieba.load_userdict(file_name) ,file_name为文件类对象或自定义词典的路径
# 自定义词典格式和默认词库dict.txt一样，一个词占一行：每一行分三部分：词语、词频（可省略）、词性（可省略），用空格隔开，顺序不可颠倒
stopWord = './stop.txt'
jieba.analyse.set_stop_words(stopWord)
cut_text= jieba.cut(text)
result= "/".join(cut_text)#必须给个符号分隔开分词结果来形成字符串,否则不能绘制词云
#print(result)

#3、生成词云图，这里需要注意的是WordCloud默认不支持中文，所以这里需已下载好的中文字库
#无自定义背景图：需要指定生成词云图的像素大小，默认背景颜色为黑色,统一文字颜色：mode='RGBA'和colormap='pink'


jieba.analyse.set_stop_words(stopWord)
data = jieba.analyse.extract_tags(result.replace('/',''), topK=100, withWeight=False, allowPOS=())
print(",".join(data))
wc = WordCloud(font_path=r"simsun.ttc",background_color='white',width=800,height=600,max_font_size=50,
               max_words=1000)#,min_font_size=10)#,mode='RGBA',colormap='pink')
wc.generate("/".join(data))
wc.to_file(r"wordcloud.png") #按照设置的像素宽高度保存绘制好的词云图，比下面程序显示更清晰
