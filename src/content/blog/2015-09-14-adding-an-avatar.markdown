---
layout: page
title: "Adding an Avatar"
date: "2015-09-14"
image:
  thumb: blog2.jpg
teaser: "I have been wanting to add my avatar and I figured out how tonight..."
subheadline: Just a little CSS magic...
categories: Blog
tags:
  - blog
  - CSS
  - jekyll
  - website
---

You may have noticed a small touch on my blog. I added my avatar up in my masthead. Let me walk you through what I had to do to get it.

First off, I have a [Gravatar](http://www.gravatar.com) that I created when I was still on [Wordpress](http://www.wordpress.org). Gravatar uses an email hash to secure your picture. So I just had to login to gravatar.com and then pull down the link. It looked somthing like this: ```http://www.gravatar.com/avatar/87fa4d6a19d6fa159cd62a4c98423335?s=100``` (hash has been adjusted to protect the innocent).

So then, I followed a couple of links I found on putting the gravatar into your website. One was from [Kyle Stratis](http://kylestratis.com/2015/05/05/blog-setup-pt2/) in his blog entry on setting up his blog with [Jekyll](http://jekyllrb.com) and [Github](http://www.github.com). The other was from [Taras Dashkevych](http://tdwp.us/round-gravatar-images-wordpress/) in which Taras talks about putting the gravatar image in a radius.

So I added in my masthead the following code:
{% highlight html %}
<a id="gravatar" href="{{ site.url}}/about/" title="{{ site.author }}">
  <img src="http://www.gravatar.com/avatar/87fa4d6a19d6fa159cd62a4c98423335.jpg?s=100" alt="{{ site.author }}">
</a>
{% endhighlight %}

I added this code into the same div as the logo image I have for my blog so they are on the same line. Then I added this code to my css files:
{% highlight css %}
#gravatar img {
    margin-top: 110px;
    position: absolute;
    right: 0px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
}
{% endhighlight %}

<img style="float: right; -webkit-border-radius: 50%; -moz-border-radius: 50%; border-radius: 50%; padding: 10px;" src="http://www.gravatar.com/avatar/87fa4d1a19d6fc159cd67a4c98423335.jpg?s=100"> Since I have a responsive site, the margin-top changes with each size I have set in my css. I matched it up with the logo img CSS entry and viola I have an avatar on my site. So that is how you can add a round avatar to your blog. Feel free to comment below or send me a [tweet](http://twitter.com?status=@virtuallyanadmi)
