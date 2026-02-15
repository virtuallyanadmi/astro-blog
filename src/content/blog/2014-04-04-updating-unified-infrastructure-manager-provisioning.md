---
comments: true
date: '2014-04-04 22:23:57+00:00'
subheadline: UIM Upgrade
title: Updating Unified Infrastructure Manager – Provisioning
image:
  thumb: EMC-UIM.png
teaser: "Here are the steps I put together to update the UIM/P."
categories: Howto
tags:
- EMC
- UIM/P
---

As part of the VCE vBlock, the Unified Infrastructure Manager -Provisioning (UIM/P) is used to provision out the hardware and can help in the automation of this type of provisioning. The UIM/P is a virtual appliance that can be deployed into a vCenter environment.

## Installation

  1. Take a snapshot of the UIM/P appliance, using vSphere Client.
{% include alert warning='A snapshot of the UIM/P appliance is important in order to prevent loss of data and allow proper rollback if an error occurs during the upgrade.' %}

  2. Use vSphere Client to mount the UIMP-4.0.0.2.xxx-Update-Media.iso file to the UIM/P appliance. In this instance, the file is located on the D: drive under ISO’s/UIM.[![UIMP ISO](/images/UIM1.png)](/images/UIM1.png)


  3. In a supported browser, type the following URL into the address bar: [https://IPofUIMPappliance:5480](https://IP of UIMP Appliance:5480/).
  [![UIM/P](/images/UIM2.png)](/images/UIM2.png)


  4. Log in as the root **user**. [![UIM/P Login page](/images/UIM3.png)](/images/UIM3.png)


  5. Click the **Update** tab.


  6. Click the **Check Updates** button, to find updates on the mounted update media.[![UIM/P Check Updates](/images/UIM4.png)](/images/UIM4.png)


  7. Click the **Install Updates** button. Installation can take up to 30 minutes to complete. You do not need to reboot the appliance or restart any services.[![Install Updates](/images/UIM5.png)](/images/UIM5.png)
  {% include alert warning='If an update failure occurs, a message is recorded in the /opt/ionix-uim/logs/appliance-update.log file.' %}

{% include alert warning='A reboot may be required after updating the UIM/P appliance. To reboot, click the System tab at the top of the UIM/P appliance management webpage, then click Actions, and then Reboot. The reboot may take 10 minutes to complete.' %}


  8. Log out of the console by selecting **Logout user root**.
  {% include alert warning='To ensure your browser reloads any updated flexui files, restart the browser before accessing the UIM/P console.' %}

## Verification

  1. In a supported browser, type the following URL into the address bar: https://<IP of UIMP appliance>.

  2. Log into the UIM/P console.

  3. Click the **Help** option on the UIM/P menu bar.

  4. Select the **About** option to open the About Unified Infrastructure Manager/Provisioning window.

  5. Verify the version of this release is **4.0.0.2.xxx**.

  6. Once verified, remove the snapshot that was initially created.
