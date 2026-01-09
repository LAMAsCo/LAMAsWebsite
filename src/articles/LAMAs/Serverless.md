---
title: "Why I Left Serverless for Oracle Cloud"
category: "Engineering"
date: "2026-01-08"
excerpt: "To achieve sub-minute uptime monitoring in PulseBoard, I hit the limits of serverless and migrated the backend to an always-on Oracle Cloud VPS. Here’s what broke, what worked, and what I’d do differently."
image: "/images/articles/Vercel_FluidActiveCPU.png"
readTime: "4 min read"
---
# Why I Left Serverless for Oracle Cloud: The Quest for Sub-Minute Monitoring

When I started building [PulseBoard](https://lamas-co.com/), I had no intentions of ever releasing it. All i wanted was to developer a complete product, while learning all the necessary components. However, in the past, I’ve always dropped projects as the learning slowed and never pushed past the simplest version of the project at hand. Making it public forced me to keep improving it. 

So, initially, I deployed everything to Vercel. It made sense, it was simple and let me iterate fast. But I quickly reached the “Serverless” limits, or at least the limits of the free version.

## The Serverless Trap

The original architecture of PulseBoard was as simple as I could make it. A Vercel serverless function and a Cron job triggering it regularly. 

1. The Cron job wakes up and calls the function.
2. It queries the database for all monitored endpoints.
3. It checks if the `last_check` was longer than the required interval.
4. It pings those URLs.

It worked perfectly well in testing and even when deployed with my own endpoints. But with Vercel’s Free Tier limits I could only call the function every 15min or I’d quickly go over the monthly compute budget. This gave me an ich I couldn’t get rid of.

For a hobby blog, finding out it went down 15min late is fine. For a SaaS promising "Real-time Checks & Alerts," a 15-minute blind spot is unacceptable. I knew competitors offered 5-min checks for free so I thought matching it had to be possible. But to go beyond, I wanted to offer **sub-1-minute accuracy**. I needed to check endpoints every 30 seconds, maybe even every 10.

![Serverless CPU Limits](/images/articles/Vercel_FluidActiveCPU.png)

Serverless functions aren't built to "wait" or loop endlessly. They are designed to spin up, do a job, and die. If I wanted a heartbeat that never stops, I needed a heart that never stops beating.

## Enter the VPS (and Oracle Cloud)

To reach the second-level accuracy I wanted, we needed a persistent environment. Something always running I could control all the time without having to worry about execution timeouts or cold starts

I looked around for solutions and landed on Oracle Cloud.

Why? Because of their "Always Free" tier. Offering 4 VCPUs of ARM-based instances that are robust enough to run a lightweight backend 24/7 is a god-send. At the moment, PulseBoard is running just fine with only one of these VCPUs leaving up options to either expand vertically or open new servers in a separate geographies for multi-location checks. 

![Oracle CPU Utilization](/images/articles/OracleCPUUtilization.png)

By moving my backend from Vercel to an Oracle VPS, I regained control over time. I replaced the intermittent Cron triggers with a custom scheduler that runs non-stop. Now, PulseBoard can loop through checks with second-level precision.

- **Vercel:** "I'll check when I can (every ~15 mins)."
- **Oracle VPS:** "I'll check exactly when you tell me to."

## The "Free Tier" Architecture

Right now, this entire stack is costing me $0.

- **Frontend:** Still on Vercel.
- **Backend:** Oracle Cloud Always Free instance running the check logic.

However, I don’t think this is an *ideal* solution. It works fine for now, but as the number of enpoints grow and check intervals decrease a single loop will eventually choke. Scaling this will mean either vertical scaling (using the remaining VCPUs and eventually paying for a better server) or horizontal scaling (sharding checks across multiple workers).

## How would you solve this?

I’m an engineer, but I’m also new to this. This migration was my solution to the "frequency problem," but I know there are a dozen ways to go about this.

![PulseBoard Checks](/images/articles/PulseboardChecks.png)

If you’ve built high-frequency polling systems before:

- Would you have stuck with Serverless and paid for premium features?
- Is there a better architecture that scales cheaply?
- Should I be looking at distinct job queues like Redis?

Let me know in the comments or reach out on [LAMAs](https://lamas-co.com/). I’m building this in public to learn, so I’d love to hear how you’d do this.
