# Turing Machine
Goal is to prove, or better say to feel on practical calculations, available via NodeJS, the miracle of irreducibility of very simple TM(3,3)


## Definition:
<span style="color: green;">Reducibility</span>

TM T is considered reducible if there exists another TM(3,x) with arbitrary number of states/memory, that goes forward only and is capable to decide correctly, after seen the whole input number will T-machine eventually stop or will loop infinitely.
- For example, TM(3,2)-grow is reducible because we can produce a javascript function that decides correctly it's halt problem on any input number and only goes forward scrolling the input number. If such javascript function exists, it can be represented by some TM with limited number of states. It's in module "resolver.grow.js" and it's job can be viewed in "ilist.grow.js" test module. Very simple to see mathematically that it will always give correct results because TM-grow doesn't go more than 3 steps back and can be remembered by a few states of memory

## <span style="color: red;">Theorem of Irreducibility</span>

There exists irreducible TM(3,3)

## Plan of proof

By counter-example with properties that no reducer can implement

### Lemma 1
Simple TM with low memory (just 3 states) behaves on small numbers scale the same way it'd behave on very large/infinite scale
### Proof:
The process of calculating output from input by TM(3,3) depends on input much more than it depends on the machine internals which are tiny in terms of memory and apparently cannot distinguish  small numbers from large. So, all properties of their behavior reveal themselves already on pretty small scale of numbers with only tens of digits
### Lemma2:
There exists arbitrary big numbers with both stop and loop behavior
### Proof:
We just produce such numbers: N(101) = \[1,0,1\].concat(\[1,0,1\])...concat(\[1,0,1\])

### Proof of Theorem
As we can see experimentally on not so big number scale, our particular TM(3,3)-rgrow apparently is capable to distinguish any of N(101) numbers in a sense that incrementing the ruler in "parallel.grow.js" sooner or later gives divergent behavior on ruled in sync numbers.
If there be resolver function for rgrow, it'd have finite number of states, and on infinite line of N(101) numbers, they would eventually coinside. Because resolver can only move forward, on a sync ruler it must always produce the same decision of halt problem for both numbers. But we can check on limited scale that rgrow with incrementing rule always diverges sooner or later. See "parallel.rgrow.js" module. By lemmas what happens on limited scale will happen on amy scale, so incrementing ruler rgrow will eventually distinguish above mentioned two N(101) numbers. Which means, that result of halt problem WILL depend on a ruler and reducer cannot tell the truth. Thus, it just can't exist

### Note
Strict mathematical proof of every made claim on scale fractionating, on infinite number of stop inputs N(101) and on divergence of halt-results with incrementing can be produced quite easy. But they are tedious, can't be remembered quite well and add almost nothing to understanding of the main reason of the fenomena - iterative revisiting of past by rgrow, so that future, dictated by the ruler in fact each time changes the past of the process. To the point where the initial state itself becomes dependent of the ruler behaviour and then changed past effects the result of reducers decicion on the halt problem. In short, infinite revisits/iterations make reducer impossible.

### Implications
- Even very simple entity, like TM(3,3) cut loose in a wild produce so complex a process, incomprehensible for mathematical method, no matter how much resources it may use. Halt problem of rgrow cannot be solved without experiment. Perhaps, some algorithms can arrive to solution faster than plain experiment via rgrow, but still, they need to do an experiment
- Mathematics in real world complexity, called cybernetics has very limited means in practical solutions of problems. Statistical methods or neural networks are needed, and they all need time for learning and collecting practical results. And the core reason for that - nature of iteration, that starts each time from the position of previous iteration which can be quite the opposite thing than the starting point. So, the result depends more on conditions on the way, than on the initials
- This fact is very deep in nature and hard to prove. The more so, to feel it on practice under the fingertips. And yet, here we are, with some power of NodeJS and modern facilities, it becomes possible to readily demonstrate quite profound features of the real world

