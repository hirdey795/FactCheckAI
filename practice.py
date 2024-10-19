from newspaper import Article
url = "https://www.cnn.com/2024/10/19/politics/president-election-michigan-harris-trump/index.html"
article = Article(url)
article.download()
article.parse()
print(article.authors)
print(article.text)

