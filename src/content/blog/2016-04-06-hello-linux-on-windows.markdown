---
layout: page
title: "Hello Linux on Windows"
date: "2016-04-06"
image:
  thumb: windows-ubuntu.png
subheadline: Microsoft releases bash to Windows
teaser: "Here's how to get bash installed on Windows, if you are running in Insider Preview of Windows 10."
category: windows
tags:
  - bash
  - Windows
  - PowerShell
  - Microsoft
---

Microsoft announced earlier today that they released a new version of the [Insider Preview](https://blogs.windows.com/windowsexperience/2016/04/06/announcing-windows-10-insider-preview-build-14316/). This update included the ability to install bash into Windows and use it. Here is how to install it after updating to the 14316 version.

In an administrative PowerShell Console run the following command (thanks to [Stuart Preston (@stuartpreston)](https://twitter.com/StuartPreston)):
{% highlight Powershell %}
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
{%endhighlight %}

After installing, the system will ask to reboot. Reboot and once the system is back up open up the PowerShell Administrative Console again and type in ```bash``` and it will install Ubuntu. This is what it will look like:

![PowerShell with bash](/images/bash-windows.PNG)

Now the system is running Ubuntu within that console. ![Ubuntu on Windows](/images/windows-ubuntu.png)

I think this is going to be useful for developers and administrators alike. Especially as Microsoft incorporates OpenSSH into their software to be able to manage and develop applications and programs moving forward. The industry is changing and so is Microsoft. It will be interesting to see what lies ahead!
