---
comments: true
date: '2014-05-04 22:57:58+00:00'
subheadline: Blog
title: Wordpress went down, Oh No!
teaser: "I didn't know it but my coworker did..."
image:
  thumb: Wordpress.jpg
categories: Blog
tags:
- Apache2
- Blog
---

Thanks to my coworker and friend [@petertymbel](https://twitter.com/petertymbel/) this morning, I found out my blog went down. I didn't notice but this past week, I upgraded my host for the blog from Ubuntu 13.10 to the new 14.04 LTS version. Well I learned a new thing by going through the process. Here are my steps to fixing the issue.

<!-- more -->

In the new version of Ubuntu, a change in the apache2 config for the 000-default virtual host file changed the default from /var/www to /var/www/html. I changed my configuration to match my setup and restarted the apache2 services and now I am back up and running.
