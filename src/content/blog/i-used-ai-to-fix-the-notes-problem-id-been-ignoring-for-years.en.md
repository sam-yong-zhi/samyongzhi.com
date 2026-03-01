---
title: "I Used AI to Fix the Notes Problem I'd Been Ignoring for Years"
date: '2026-03-01'
categories:
  - ai-and-work
description: >-
  I work in AI for a living. For years I had a notes problem I never fixed.
  Then I connected Claude to Notion, handed it years of scattered notes, and
  watched it organize everything in about an hour.
draft: false
---

I have a confession that will resonate with a specific kind of person.

I work in AI enablement. My job, literally, is helping organizations figure out how to use AI to work differently. I spend my days thinking about workflows, about what AI is genuinely good at versus where it falls short, about the gap between what the technology can do and what people actually do with it.

And for years, I had a notes problem I never fixed.

## The problem

Anyone who jots things down on the go will recognize this. Blog ideas that come to you on a flight. Reflections you write to yourself after a meaningful trip. Investment thoughts you don't want to forget. Things you want to teach your kids one day. Career observations. Random links.

I had all of these. Scattered across iCloud Notes, a Notion workspace I built and abandoned, random Google Docs I couldn't find, voice memos I never transcribed.

The capture was never the problem. Something would occur to me, I'd write it down somewhere. The organizing was what defeated me every time.

I tried fixing it properly. I watched the YouTube videos, built a full Life OS Dashboard in Notion. Command Center, databases, weekly views, the whole thing. I used it for maybe three weeks. Once you fall behind, the inertia of catching up feels impossible. So you just don't. And months pass. And the notes pile up in whichever app you opened first.

I knew this was a solvable problem. I just kept not solving it.

## Why I knew AI would be good at this

Here's the thing about working in AI. You develop a reasonably clear sense of what LLMs are actually good at versus what they are mediocre at or confidently wrong about.

One of the things they are genuinely excellent at is making sense of unstructured text. Taking a messy pile of notes written at different times, in different moods, about different topics, and finding the shape in it. Categorizing without being told the categories. Summarizing where summary helps. Preserving exact wording where exact wording matters.

I knew this. Professionally. I just hadn't connected it to my own scattered notes problem until recently.

That gap, between knowing something is possible and realizing you can just do it today with tools you already have, is surprisingly wide. Even when you work in the field.

## The two minute setup

Claude has an MCP integration with Notion. MCP stands for Model Context Protocol, but you don't need to know what that means. The practical implication is that Claude can connect directly to your Notion workspace and actually do things inside it, not just give you advice about it.

Setting it up: open Notion settings, go to Connections, search for Claude, hit connect. That's it. No API keys, no code, no developer account. Two minutes.

Once connected, Claude can read your pages, create new ones, update content, move things around, build nested subpages. It's not Claude looking at a screenshot of your Notion. It has actual write access, like a collaborator you've invited.

## What the actual conversation looked like

I didn't go in with a plan. I created a single blank page in Notion called Inbox, opened a conversation with Claude, and said: I'm going to paste years of scattered notes from my Apple iCloud Notes in here. Read through everything and tell me what you find before touching anything.

This part matters. I didn't want Claude to just start reorganizing. I wanted to see what it made of the mess first.

It came back with a clear read of what was in there. Blog ideas and content strategy thinking. Personal reflections I'd written on flights and at the end of trips. Investment notes and portfolio thinking. Family observations, things I want to teach my daughters. Career notes from my time at SAP.

Then it told me what it was planning to do with each category. Which things it would summarize versus preserve word for word. Where it thought nested subpages made more sense than a single long page. What it wanted to move where.

And it waited. It didn't touch anything until I said go ahead.

When I did, I watched my Notion update in real time while we were still mid-conversation. Pages appeared. Content moved. Subpages nested inside parent pages. A workspace that had been embarrassingly disorganized for years started looking like something I'd actually want to open.

The whole session took about an hour, including all the back and forth.

## The part that's hard to explain

There's a version of AI assistance that feels like having a very capable advisor. It gives you good recommendations. You go and implement them yourself. That's useful but it's still work.

What this felt like was different. It felt like having someone actually sitting next to me, doing the organizing while I watched and occasionally said yes or no. The work was happening. I just wasn't the one doing it.

That's a different relationship with a tool than most people have experienced yet. And I think it's why a lot of people underestimate what's now possible for personal productivity specifically. We're used to AI as a generator, give it a prompt, get an output. The executor version, where it has access to your actual systems and just does the thing, is a different category.

The reason it worked well here, and I want to be honest about this rather than just evangelical, is that the task was genuinely suited to what LLMs are good at. Unstructured text, categorization, context understanding across long messy notes, this is squarely in their wheelhouse. I wouldn't use this approach for something requiring precise calculations or real-time information. But for making sense of years of scattered personal notes? It's close to ideal.

## A prompting tip that changed how I work

One thing that made this session significantly better: I used ChatGPT's voice transcription to speak my prompts instead of typing them.

I know that sounds strange. Why use ChatGPT to talk to Claude? Because the voice recognition in ChatGPT's app handles a Singaporean accent unusually well, and Claude's desktop app doesn't have voice input yet. So I speak into ChatGPT, it transcribes, I paste the text into Claude.

The reason this matters: speaking lets you give much more context than typing. When you type a prompt, you edit yourself. You compress. You cut the parts that feel redundant. But those parts are often what gives the AI enough context to actually understand what you want.

When you speak, you ramble a bit. You explain your thinking. You add background that you'd normally leave out. That extra context is what separates a mediocre AI response from a genuinely useful one.

If you haven't tried voice to text for prompting, it's worth a week of experimenting. It changed how I interact with AI tools across the board.

## What actually changed

I'd been trying to solve an organization problem with discipline. The implicit assumption was that if I could just be more consistent, more diligent, more systematic, I'd maintain a proper note-taking system.

That assumption was wrong for me. I've tested it enough times to know. The discipline doesn't stick. Life gets in the way. The system decays.

What works, I now think, is separating capture from organization completely. Capture is mine. Every reflection, every idea, every observation, that has to come from me, in the moment, with no friction. An Inbox page in Notion where I dump whatever's on my mind. No structure required.

Organization is delegated. Once a month or so, I'll ask Claude to go through whatever has accumulated in the Inbox, sort it into the right places, and clear it out. The maintenance burden on me is close to zero.

This isn't a revolutionary insight about productivity. But the execution of it, actually being able to hand off the organization to something that can do it well, is new. That part wasn't possible in a practical sense until recently.

## If you have a Notion account gathering dust

The notes problem I described is not unique to me. I've heard versions of it from enough people to know it's a fairly universal experience among people who care about capturing their thinking but struggle to maintain any system for organizing it.

The setup is genuinely straightforward. You don't need to be technical. You don't need to understand how MCP works. You connect Claude to Notion in two minutes, create an Inbox page, and start dumping things in.

The AI does the rest when you ask it to.

I'm probably not the first person to figure this out. But if you hadn't thought of it yet, now you have. Might be worth an afternoon.
