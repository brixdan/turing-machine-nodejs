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

# Turing Mashine Concept
While the concept of TM solves the main problem of splitting time in an ordered sequence of parts, proving of each being strictly deterministic, it heavily obscures all other aspects of the notion of algorithm itself.

In fact, it appears to be a chaotic process, rather than scientific approach in nature. It happens because of freedom to go back and forth along the tape, thus using it as unlimited size memory medium. It actually iterates over initial tape again and again, until initial state is unimportant at all, future affects past, past future, they mix and shuffle in absolutely chaotic manner. Chaotic, meaning so complex, that may be well considered random. Random and exceedingly complex are the same notions.

Every low information process over unlimited scope of time must be fractal, periodical in nature, but TM is not so. We have seen some very simplistic TM(3,3) that goes a thousand times wider than initial word length before it eventually stops. E.g. "Rgrow" machine and tape = [1,0,1,1,0,1,1,0,1,0,1,1,1,0,1 \] rgrow: stops at step 23595! which is absolutely amusing.

If some problem resolves mathematically, then we should have an algorithm, that uses limited number of memory cells, holding limited values and calls on every step right some limited number of pure deterministic functions, updating those cells and state itself. TM cannot go back over the tape, otherwise it performs physical experiment, not a computation of some defining property, which is a purpose of mathematics. Example of such an algorithm - division by 3 check. Also, reducer for grow TM is clearly of that kind.

It seems like prime number check is an algorithm, but in reality it is not. Just a physical check, enumeration of all possible devisors. Math has nothing to do with that.

From that point stems a big mess with complexity evaluation. As TM moves right direction over tape, performing each time limited by K number of additional auxiliary steps, it makes a total of n + K*n = O(n) steps at most. Everything, that exceeds that number is a test, not an algorithm and cannot be subject to math, only neural networks, demanding lots of time and power.

How can we measure one chaotic process by another chaotic process. Which of two random numbers is "more random". It's like comparing Cantor numbers - not much sensible, except maybe just madness.