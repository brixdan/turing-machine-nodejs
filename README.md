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
- We aim to investigate an abnormal surge in complexity between TM(3,1) and
TM(3,2)(turing machine with 3 symbols on tape and 2 inner states)
- We are capable to describe in a few sentences all classes of TM(3,1),
whereas presumably their exists TM(3,2) with undecidable halting problem.
We want to identify that machine and get some insights of why exactly it becomes
so hard to predict its behavior.
- We want to start playing with most simple machines and suddenly come to
understanding why they evolve so fast in complexity with the number of inner
states, which denotes by letters q0,q1 etc.

### Conventions
- Tape is just a plain old javascript array. Binary numbers grows in
right direction, not left, as usual. It proves to be natural and convenient.
- Tape (array), can only contain 3 symbols: 0,1,B/blank/undefined
- Active HEAD flies over tape in adjacent left (L) or right (R) members,
or jumps to initial zero position. It allows to avoid some insignificant,
but quite annoying problems, that may shadow principal concepts
- To avoid an overuse of quotes/double-quotes/JSONs we just put variables
names as their values and deconstruction is visible from submodule
- "With" statement and nullish coalescing makes real good for code reduction
- Half page of simple code in "engine.js" does all the job, together with
testing section at the bottom of it. Individual TMs implemented as modules
and called by names

## Usage
- The simples task is to increment a number, say 2 ( \[0,1\] in our arabic notation)
say 4 times with code like:

                        var tape = [0,1];
                        for(let i = 0; i<4;i++){
                        tape = tm("increment", tape);
                        console.log("out:", ...tape)
                        }

and the result should be \[0,1,1\], or exactly 6