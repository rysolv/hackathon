# Bad UI Phone Number

![Showcase of Bad UI phone number](./github/showcase.gif)

## What is this?

This is an app for the Bad UI hackathon at https://github.com/rysolv/hackathon. The challenge was to make a bad phone number input in 24 hours. This submission, I built a phone number input in which each digit is a column of numbers with incrementally increasing gravity. You need to align the numbers of your phone number.

## How do I run it?

Visit https://badui-phone-input.web.app/, or run the following command in your terminal:

```
npm run dev
```

You can control the speed by imperatively changing the `acceleration` query parameter (default is 0.0002) or by finishing the phone number input and selecting a difficulty on the bottom.

## How is it built?

It's a standard input field, but when clicking a button, a modal pops up.

The phone number is a row of columns, each column contains 20 numbers of 0-9 and 0-9 again.

At every animation frame, every column gradually moves faster. The speed moves based off of the acceleration value.

If you drag a column, it follows the mouse, but if you let go. It uses the current mouse velocity for the speed of the value.