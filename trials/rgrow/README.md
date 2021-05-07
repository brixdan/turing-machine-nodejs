# Turing Machine
Goal is to prove by counter-example that resolver function with limited number of states
cannot correctly decide for some special cases on future state of resolvee
machine

## Plan of proof
- rgrow machine can be forced for unlimited revisits of the past, so
the states of resolver must eventually coincide on some of them
- If we are able to prove, that some future development with some special
ruler can diverge in behavior any of such states, that would prove
non-existence of resolver machine
- Or we should find some rule that brings the state to the point, that diverges
of all enumerated previous states by some further ruler
## Start with rgrow TM and develop compare software
- 