# Turing Machine
Simple, yet powerful Nodejs implementation of TM useful for experimenting  
and research

## Intentions
- The most human comprehensible conventions and definitions,
developing cristal clear mental intuition on computational process
- Convention over configuration approach in spirit of JavaScript
and Nodejs
- Illustration and proof of most important theorems on complexity and
reducibility
- Demonstrating some modern features of JavaScript and NodeJS - only
will work on version 15.x

### Conventions
- Tape is just a plain old javascript array. Binary numbers grows in
right direction, not left, as usual. It proves to be natural and convenient.
- Tape (array), can only contain 3 symbols: 0,1,B/blank/undefined
- Active HEAD flies over tape in adjacent left (L) or right (R) members,
or jumps to initial zero position. It allows to avoid some insignificant,
but quite annoying problems, that may shadow principal concepts

