---
layout: page
title: "Finally got a photo album working"
date: "2015-08-31"
image:
  thumb: blog1.jpg
teaser: "After migrating to Jekyll, I couldn't figure out what to do with my photo albums, until tonight..."
subheadline: Photo Album fix
categories: Blog
tags:
  - blog
  - github
  - jekyll
  - gallery
  - photos
  - flickr
---
So like I said in [yesterday's](/blog/2015/08/30/migrating-to-new-format/) blog entry, I talked about migrating this blog to the new format. One of the things I ran into was what to do with my photo galleries that I had out on [Flickr](http://Flickr.com). Well I figured it out tonight so I thought I would share it, even though I have already done a blog entry tonight.

While trying to figure out this conundrum, I had research various ways of bringing in the pictures that I have up on [Flickr](http://flickr.com). One way was to do it via a Rubygem and there were a couple of different ones I looked at. Like [this one](https://github.com/hanklords/flickraw) and [this one](http://www.marran.com/tech/integrating-flickr-and-jekyll). But when I attempted to do it, I failed miserably. Also, I wanted this blog to be as minimal as possible and try to do it without plugins.

This turned out to be difficult. I even tried doing something like this:

{% highlight html %}
<ul>
  <li><img src="http://flickrpicture.com"></img>
  <li><img src="http://secondflickrpicture.com"></img>
  <li><img src="http://thirdflickrpicture.com"></img>
</ul>
{% endhighlight %}

Can you imagine doing this for about 100 images. I think I got about 12 images in and gave up on that idea, even though I had all of the image links. It just wasn't fun. Then tonight, I started doing more research and came across this [blog entry](http://www.blogs.jbs.cam.ac.uk/digitalstrategy/2014/04/30/embedding-sets-of-flickr-pictures-on-our-website/). It talked about embedding Flickr pictures in your website. I copied over the code and then put in my own code. It looked like this when I first copied it over:

{% highlight html %}
<style>.embed-container { position: relative; padding-bottom: 56.25%; padding-top: 30px; height: 0; overflow: hidden; max-width: 100%; height: auto; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.flickr.com/photos/judgebusinessschool/sets/72157644210270121/player/' frameborder='0' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe></div>
{% endhighlight %}

Then since it had css in it with the ```.embed-container``` I took that part out and put it into one of my scss files. This left me with just the div and iframe. Then I thought, what if I want to put more galleries in my blog, let's create a layout for it. So I copied my [page-fullwidth.html](/_layouts/page-fullwidth.html) layout and edited the ```{{ content }}``` section, putting the div and iframe in it. Then to make it easy to create pages, I stripped out the album number and gave it a variable to be in the header information section of the page. This is what that section of code looks like:

{% highlight text %}
<span itemprop="articleSection">
     <div class='embed-container'>
       <iframe src='https://www.flickr.com/photos/132359970@N02/sets/{{ page.album }}/player/' frameborder='0' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
     </div>
</span>
{% endhighlight %}

If you notice, the variable is ```{{ page.album }}``` and so then I just have to have in my markdown page:

{% highlight text %}
---
layout: gallery
title: "gallery title"
date: "date of post"
subheadline: a subheadling, any will do
teaser: "This will show on the main blog site."
image:
  thumb: a thumbprint picture name .jpg, .png, etc.
album: This is the important part as it is the album number from Flickr.
---
{% endhighlight %}

That's it, and the album slideshow comes out on the page. There is one caveat doing it this way, there are no thumbprints and the slideshow left and right arrows do not pop up until you hover over the image, but for me it works. Who knows, maybe I'll look into adding something later on...
