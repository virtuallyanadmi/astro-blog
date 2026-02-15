---
comments: true
date: '2013-03-13 01:28:05+00:00'
subheadline: Blog
title: Migration again, this time to AWS - Part 1
teaser: "So I thought I would try out Amazon Web Services (AWS) with their Elastic Compute Cloud  (EC2). I thought what a perfect test to migrate my WordPress blog to it from my home lab. I use this blog to test things anyway so why not, right?"
image:
  thumb: AWS.png
categories: AWS
tags:
- AWS
- Blog
- VirtuallyanAdmin
---

Well, I got started by signing up for their [AWS Free Tier](http://aws.amazon.com/free). It was simple as I already have an Amazon.com account so it just took a couple of clicks and I was on my way.

Amazon does a good job of offering various OS packages from Linux to Windows but you need to watch out for whether or not it is available for the free tier. I chose Ubuntu 12.10 as it is available for the free tier. What is cool is that it take literally a couple of minutes to have the server up and going. I would suggest if you want a static IP address to use one of the 5 free Elastic IPs given by AWS. You just click create and then associate it to a server and it automatically assigns the server the IP. Pretty cool.

To connect to the server, I used SSH. I followed a couple of blogs in what to do to connect. Basically, the short version is to download the .pem key after creating the server. As part of the setup, you click on download pem and it will save a .pem file to your location of choice. Then using Putty-gen, grab the .pem file and convert it to a Putty .ppk file. Then open Putty up and in the authentication tab, simple browse for the .ppk file and then add your IP, give it a name to save the profile and then click Open. You can follow [these instructions](http://pinehead.tv/linux/connect-to-amazon-ec2-using-putty-private-key-on-windows/) if you want a detailed how to. The instructions even include a video.

Once connected, I set up the LAMP server following [these instructions](http://www.howtoforge.com/installing-apache2-with-php5-and-mysql-support-on-ubuntu-12.10-lamp). Then I installed WordPress. Next time, I will go over my struggles and eventual overcoming the WordPress installation issues with mysql and migrating the blog over.
