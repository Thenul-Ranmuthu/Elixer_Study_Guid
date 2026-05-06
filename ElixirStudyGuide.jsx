import { useState } from "react";

/* ─────────────────────────────────────────────
   Elixir & Functional Programming Study Guide
   Converted from HTML to deployable React JSX
   ───────────────────────────────────────────── */

// ── Syntax-highlighted code block ──────────────
function CodeBlock({ children }) {
  return (
    <pre style={styles.pre}>
      <code dangerouslySetInnerHTML={{ __html: children }} />
    </pre>
  );
}

// ── Highlight callout box ───────────────────────
function Highlight({ children }) {
  return <div style={styles.highlight}>{children}</div>;
}

// ── Concept card (label / value / sub) ─────────
function ConceptCard({ label, value, sub }) {
  return (
    <div style={styles.conceptCard}>
      <div style={styles.conceptLabel}>{label}</div>
      <div style={styles.conceptVal}>{value}</div>
      {sub && <div style={styles.conceptSub}>{sub}</div>}
    </div>
  );
}

// ── Compare card (good / bad) ───────────────────
function CompareCard({ variant, title, children }) {
  const isGood = variant === "good";
  return (
    <div style={{ ...styles.compareCard, ...(isGood ? styles.compareGood : styles.compareBad) }}>
      <div style={{ ...styles.compareTitle, color: isGood ? "#10b981" : "#ef4444" }}>{title}</div>
      {children}
    </div>
  );
}

// ── Badge ───────────────────────────────────────
function Badge({ variant, children }) {
  const colors = {
    info:    { background: "#eff6ff", color: "#2563eb" },
    success: { background: "#f0fdf4", color: "#16a34a" },
    warn:    { background: "#fffbeb", color: "#d97706" },
    danger:  { background: "#fef2f2", color: "#dc2626" },
  };
  return <span style={{ ...styles.badge, ...colors[variant] }}>{children}</span>;
}

// ══════════════════════════════════════════════════
//  TAB SECTIONS
// ══════════════════════════════════════════════════

function OverviewSection() {
  return (
    <div>
      <h2 style={styles.h2}>What this lecture is about</h2>
      <p style={styles.p}>
        This is Lecture 4 on Functional Programming (Programming Languages unit, Arlen Brower / David
        McMeekin). Together with the "Thinking in Functions" supplement and Kalpani's additional notes,
        it covers the entire conceptual and practical foundation of Elixir.
      </p>

      <div style={styles.cardGrid}>
        <ConceptCard label="Language"  value="Elixir"       sub="Runs on BEAM (Erlang VM)"      />
        <ConceptCard label="Paradigm"  value="Functional"   sub="No classes, no mutable state"  />
        <ConceptCard label="Style"     value="Declarative"  sub="Describe what, not how"        />
        <ConceptCard label="Strengths" value="Concurrency"  sub="Fault-tolerant, scalable"      />
      </div>

      <h3 style={styles.h3}>The functional family tree (from your slides)</h3>
      <div style={styles.card}>
        {[
          { indent: 0, bg: "#f3f4f6", color: "#374151", id: "L",  name: "LISP",        desc: "John McCarthy, 1958. First functional language. Needed recursion + linked lists for AI." },
          { indent: 2, bg: "#eff6ff", color: "#2563eb", id: "S",  name: "Scheme",      desc: "MIT, mid-1970s. Statically scoped, functions as first-class entities." },
          { indent: 2, bg: "#eff6ff", color: "#2563eb", id: "CL", name: "Common Lisp", desc: "Combined many Lisp dialects to solve portability issues." },
          { indent: 2, bg: "#fffbeb", color: "#d97706", id: "Er", name: "Erlang",      desc: "Ericsson, telecom. Scalable, fault-tolerant. Verbose syntax." },
          { indent: 4, bg: "#f0fdf4", color: "#16a34a", id: "Ex", name: "Elixir",      desc: "Modern syntax on BEAM VM. Powers WhatsApp, RabbitMQ. \"A little nicer.\"" },
        ].map((row) => (
          <div key={row.id} style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: `${row.indent * 0.5}rem`, marginBottom: 8 }}>
            <div style={{ ...styles.treeIcon, background: row.bg, color: row.color }}>{row.id}</div>
            <div style={{ fontSize: 13 }}>
              <strong>{row.name}</strong>{" "}
              <span style={{ color: "#6b7280" }}>— {row.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <h3 style={styles.h3}>The 3 key requirements (McCarthy's original insight)</h3>
      <p style={styles.p}>To process symbolic data in linked lists, you need:</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "0.75rem" }}>
        <Badge variant="info">1. Recursion</Badge>
        <Badge variant="success">2. Conditional expressions</Badge>
        <Badge variant="warn">3. Dynamic allocation of linked lists</Badge>
      </div>
      <p style={{ ...styles.p, fontSize: 13 }}>
        Elixir satisfies all three natively. These aren't optional extras — they are the engine of the language.
      </p>
    </div>
  );
}

function FPConceptsSection() {
  return (
    <div>
      <h2 style={styles.h2}>Functional programming concepts</h2>

      <h3 style={styles.h3}>The paradigm shift: von Neumann vs. Mathematical evaluation</h3>
      <div style={styles.compareGrid}>
        <CompareCard variant="bad" title="Imperative (von Neumann)">
          <CodeBlock>{`<span style="color:#ef4444">static int x = 1;\nx = x * 2;  // overwrites memory\nreturn x;   // side-effect!</span>`}</CodeBlock>
          <p style={{ fontSize: 12, marginTop: 6, color: "#ef4444" }}>Programs and data in memory. Iteration efficient. But state causes bugs.</p>
        </CompareCard>
        <CompareCard variant="good" title="Functional (Mathematical)">
          <CodeBlock>{`<span style="color:#10b981">f(x) = x³\nx = 2 → f(2) = 8\n# No memory overwrite</span>`}</CodeBlock>
          <p style={{ fontSize: 12, marginTop: 6, color: "#10b981" }}>Parameters mapped to values directly. No state. Pure evaluation.</p>
        </CompareCard>
      </div>

      <h3 style={styles.h3}>Pure functions</h3>
      <Highlight>Same input → same output. Always. No side effects. This makes code modular, highly concurrent, and trivial to test.</Highlight>
      <CodeBlock>{`<span style="color:#6b7280;font-style:italic"># Pure: output depends only on input</span>
<span style="color:#a855f7">defmodule</span> <span style="color:#3b82f6">Math</span> <span style="color:#a855f7">do</span>
  <span style="color:#a855f7">def</span> <span style="color:#3b82f6">square</span>(x), <span style="color:#a855f7">do</span>: x * x
<span style="color:#a855f7">end</span>

<span style="color:#6b7280;font-style:italic"># Impure: reads/modifies external state — AVOID in FP</span>
<span style="color:#6b7280;font-style:italic"># static int counter = 0; counter++;</span>`}</CodeBlock>

      <h3 style={styles.h3}>Immutability: transformation, not mutation</h3>
      <p style={styles.p}>In Elixir, data never changes. Functions take in data and return brand new, transformed data. This eliminates race conditions in concurrent systems.</p>
      <div style={styles.compareGrid}>
        <CompareCard variant="bad" title="Imperative (mutates)">
          <CodeBlock>{`<span style="color:#ef4444">[1,2,3] → [1,9,3]\n# Same variable overwritten</span>`}</CodeBlock>
        </CompareCard>
        <CompareCard variant="good" title="Functional (transforms)">
          <CodeBlock>{`<span style="color:#10b981">[1,2,3] → function → [1,9,3]  (new)\n[1,2,3]  ← original untouched</span>`}</CodeBlock>
        </CompareCard>
      </div>
      <CodeBlock>{`<span style="color:#6b7280;font-style:italic"># put_elem returns a NEW tuple — aTuple unchanged</span>
aTuple = {1, 2, 3}
newTuple = put_elem(aTuple, 1, 10)
<span style="color:#6b7280;font-style:italic"># aTuple is still {1, 2, 3}</span>
<span style="color:#6b7280;font-style:italic"># newTuple is {1, 10, 3}</span>`}</CodeBlock>

      <h3 style={styles.h3}>Avoiding side effects</h3>
      <p style={styles.p}>FP tries to avoid side effects — anything that modifies state outside a function. The hidden cost of state: NULL pointer dereferences, buffer overflows, dangling pointers, stack overflows. Immutability eliminates all of these.</p>

      <h3 style={styles.h3}>The four pillars (your blueprint cheat sheet)</h3>
      <div style={styles.cardGrid}>
        <ConceptCard label="Rule"      value="Pure functions"   sub="Yields predictability & modularity"       />
        <ConceptCard label="Data"      value="Immutability"     sub="Yields safe concurrency"                  />
        <ConceptCard label="Structure" value="Linked lists"     sub="Yields natural recursive processing"      />
        <ConceptCard label="Engine"    value="Tail recursion"   sub="Yields infinite iteration without overflow" />
      </div>
    </div>
  );
}

function ElixirBasicsSection() {
  return (
    <div>
      <h2 style={styles.h2}>Elixir basics</h2>

      <h3 style={styles.h3}>What Elixir is</h3>
      <p style={styles.p}>Elixir is a functional, concurrent, fault-tolerant language running on the BEAM (Erlang Virtual Machine). It brings modern, cleaner syntax to Erlang's battle-tested infrastructure. Functions are the main building blocks — not classes or objects.</p>

      <h3 style={styles.h3}>Modules and functions</h3>
      <CodeBlock>{`<span style="color:#a855f7">defmodule</span> <span style="color:#3b82f6">Greeting</span> <span style="color:#a855f7">do</span>
  <span style="color:#a855f7">def</span> <span style="color:#3b82f6">hello</span>(name) <span style="color:#a855f7">do</span>
    <span style="color:#10b981">"Hello, \#{name}!"</span>
  <span style="color:#a855f7">end</span>
<span style="color:#a855f7">end</span>

<span style="color:#6b7280;font-style:italic"># Short form (single expression)</span>
<span style="color:#a855f7">def</span> <span style="color:#3b82f6">hello</span>(name), <span style="color:#a855f7">do</span>: <span style="color:#10b981">"Hello, \#{name}!"</span>

<span style="color:#6b7280;font-style:italic"># Private function (only callable within module)</span>
<span style="color:#a855f7">defp</span> <span style="color:#3b82f6">secret</span>(x), <span style="color:#a855f7">do</span>: x * 2`}</CodeBlock>

      <h3 style={styles.h3}>Variables</h3>
      <p style={styles.p}>Variables in Elixir are <em>bound</em>, not assigned in the imperative sense. They cannot be mutated — rebinding creates a new binding.</p>
      <CodeBlock>{`x = 10
y = x + 5   <span style="color:#6b7280;font-style:italic"># y = 15, x still = 10</span>
x = 20      <span style="color:#6b7280;font-style:italic"># rebinding x — the old 10 is gone from this scope</span>`}</CodeBlock>

      <h3 style={styles.h3}>IO — printing output</h3>
      <Highlight>
        <strong>IO.puts</strong> — prints strings only (converts integers but NOT lists)<br />
        <strong>IO.inspect</strong> — prints any data structure, great for debugging
      </Highlight>
      <CodeBlock>{`IO.puts(<span style="color:#10b981">"hello"</span>)       <span style="color:#6b7280;font-style:italic"># OK</span>
IO.puts(123)          <span style="color:#6b7280;font-style:italic"># OK (converted to "123")</span>
IO.puts([1, 2, 3])    <span style="color:#6b7280;font-style:italic"># ERROR — lists are special in Elixir!</span>
IO.inspect([1, 2, 3]) <span style="color:#6b7280;font-style:italic"># OK — use this for lists</span>`}</CodeBlock>

      <h3 style={styles.h3}>Erlang vs Elixir — same BEAM, better syntax</h3>
      <p style={styles.p}>Your slides show a GenServer (server process) in both. The Erlang version requires ~20 lines with verbose attribute syntax. The Elixir version:</p>
      <CodeBlock>{`<span style="color:#a855f7">defmodule</span> <span style="color:#3b82f6">SumServer</span> <span style="color:#a855f7">do</span>
  <span style="color:#a855f7">use</span> GenServer

  <span style="color:#a855f7">def</span> <span style="color:#3b82f6">start</span> <span style="color:#a855f7">do</span>
    GenServer.start(__MODULE__, <span style="color:#f59e0b">nil</span>)
  <span style="color:#a855f7">end</span>

  <span style="color:#a855f7">def</span> <span style="color:#3b82f6">sum</span>(server, a, b) <span style="color:#a855f7">do</span>
    GenServer.call(server, {<span style="color:#f59e0b">:sum</span>, a, b})
  <span style="color:#a855f7">end</span>

  <span style="color:#a855f7">def</span> <span style="color:#3b82f6">handle_call</span>({<span style="color:#f59e0b">:sum</span>, a, b}, _from, state) <span style="color:#a855f7">do</span>
    {<span style="color:#f59e0b">:reply</span>, a + b, state}
  <span style="color:#a855f7">end</span>
<span style="color:#a855f7">end</span>`}</CodeBlock>
      <p style={{ fontSize: 13, color: "#6b7280" }}>This is the same GenServer behaviour — just much cleaner. Elixir is a little nicer.</p>
    </div>
  );
}

function DataTypesSection() {
  return (
    <div>
      <h2 style={styles.h2}>Elixir data types</h2>

      <h3 style={styles.h3}>Atoms</h3>
      <p style={styles.p}>Atoms are labels for unique, immutable values. They evaluate to themselves and are fundamentally different from variables. Used as tags, status codes, and keys.</p>
      <CodeBlock>{`<span style="color:#f59e0b">:ok</span>
<span style="color:#f59e0b">:error</span>
<span style="color:#f59e0b">:sum</span>
<span style="color:#f59e0b">true</span>   <span style="color:#6b7280;font-style:italic"># true and false are atoms</span>
<span style="color:#f59e0b">nil</span>    <span style="color:#6b7280;font-style:italic"># nil is also an atom</span>`}</CodeBlock>
      <Highlight>Atoms start with a colon. They are like named constants that mean exactly what they say. Tuples often use an atom as a first element to signal a type, e.g. <code>{"{:ok, value}"}</code> or <code>{"{:error, reason}"}</code>.</Highlight>

      <h3 style={styles.h3}>Tuples</h3>
      <p style={styles.p}>An ordered, fixed-size collection of values written using <code>{"{}"}</code>. Can hold any data type. Immutable — once created, cannot be modified. Pattern matching works powerfully on tuples.</p>
      <CodeBlock>{`iex> {1, 2, 3}
{1, 2, 3}

iex> a = {1, 2, 3}

<span style="color:#6b7280;font-style:italic"># Pattern matching — destructure a tuple into variables</span>
iex> {x, y, z} = {1, 2, 3}
iex> x   <span style="color:#6b7280;font-style:italic"># 1</span>
iex> y   <span style="color:#6b7280;font-style:italic"># 2</span>

<span style="color:#6b7280;font-style:italic"># Literals in patterns must match exactly</span>
iex> {1, y, z} = {10, 2, 3}
<span style="color:#6b7280;font-style:italic"># ** (MatchError) — 1 != 10</span>

<span style="color:#6b7280;font-style:italic"># put_elem returns a brand new tuple</span>
new_tuple = put_elem(a, 1, 10)   <span style="color:#6b7280;font-style:italic"># {1, 10, 3}</span>`}</CodeBlock>

      <h3 style={styles.h3}>Pattern matching — the key feature</h3>
      <Highlight>The <code>=</code> sign in Elixir is a <strong>match operator</strong>, not assignment. It tries to make the left side match the right side. Variables on the left get bound to values on the right.</Highlight>
      <CodeBlock>{`<span style="color:#6b7280;font-style:italic"># Tuple pattern match</span>
{a, b, c} = {1, 2, 3}   <span style="color:#6b7280;font-style:italic"># a=1, b=2, c=3</span>

<span style="color:#6b7280;font-style:italic"># List pattern match</span>
[head | tail] = [1, 2, 3]   <span style="color:#6b7280;font-style:italic"># head=1, tail=[2,3]</span>

<span style="color:#6b7280;font-style:italic"># _ is a wildcard — "I don't care about this value"</span>
[a | _] = [1, 2, 3]   <span style="color:#6b7280;font-style:italic"># a=1, ignore the rest</span>
<span style="color:#6b7280;font-style:italic"># Note: _ cannot be used in expressions — only in patterns</span>`}</CodeBlock>

      <h3 style={styles.h3}>Lists</h3>
      <p style={styles.p}>An ordered, linked collection of elements written with square brackets <code>[]</code>. Immutable. Can hold mixed types. Structured as recursive <code>[head | tail]</code>.</p>
      <CodeBlock>{`x = [1, 2, 3]
hd(x)   <span style="color:#6b7280;font-style:italic"># 1  — the head (first element)</span>
tl(x)   <span style="color:#6b7280;font-style:italic"># [2, 3]  — the tail (rest of list)</span>

<span style="color:#6b7280;font-style:italic"># Construct a new list</span>
[1 | [2, 3]]   <span style="color:#6b7280;font-style:italic"># [1, 2, 3]</span>

<span style="color:#6b7280;font-style:italic"># Concatenate lists</span>
[1, 2] ++ [3, 4]   <span style="color:#6b7280;font-style:italic"># [1, 2, 3, 4]</span>

<span style="color:#6b7280;font-style:italic"># Lists can contain anything — even nested lists</span>
[1, 2, [<span style="color:#10b981">'b'</span>, <span style="color:#10b981">'c'</span>], 3, 4]`}</CodeBlock>
      <Highlight>In Lisp/Scheme: <code>car</code> = head, <code>cdr</code> = tail, <code>cons</code> = construct a list. In Elixir: <code>hd()</code>, <code>tl()</code>, <code>{"[h | t]"}</code>. Same idea, nicer syntax.</Highlight>

      <h3 style={styles.h3}>Lists as recursive structures</h3>
      <p style={styles.p}>Lists can be thought of as: a head value + a tail (which is also a list). An empty tail <code>[]</code> signals the end. This structure is what makes recursion on lists natural.</p>
      <CodeBlock>{`my_list = [head | tail]
<span style="color:#6b7280;font-style:italic"># [1, 2, 3] is really [1 | [2 | [3 | []]]]</span>`}</CodeBlock>
    </div>
  );
}

function FunctionsSection() {
  return (
    <div>
      <h2 style={styles.h2}>Functions in Elixir</h2>

      <h3 style={styles.h3}>Named functions with pattern matching</h3>
      <p style={styles.p}>Elixir uses pattern matching on function arguments to select which clause to execute. This replaces if/else chains and is the idiomatic way to write conditional logic.</p>
      <CodeBlock>{`<span style="color:#a855f7">defmodule</span> <span style="color:#3b82f6">Math</span> <span style="color:#a855f7">do</span>
  <span style="color:#a855f7">def</span> <span style="color:#3b82f6">factorial</span>(0), <span style="color:#a855f7">do</span>: 1           <span style="color:#6b7280;font-style:italic"># base case</span>
  <span style="color:#a855f7">def</span> <span style="color:#3b82f6">factorial</span>(n), <span style="color:#a855f7">do</span>: n * factorial(n - 1)
<span style="color:#a855f7">end</span>

IO.puts(Math.factorial(5))   <span style="color:#6b7280;font-style:italic"># 120</span>

<span style="color:#a855f7">defmodule</span> <span style="color:#3b82f6">My</span> <span style="color:#a855f7">do</span>
  <span style="color:#a855f7">def</span> <span style="color:#3b82f6">sum</span>([]), <span style="color:#a855f7">do</span>: 0
  <span style="color:#a855f7">def</span> <span style="color:#3b82f6">sum</span>([head | tail]), <span style="color:#a855f7">do</span>: head + sum(tail)
<span style="color:#a855f7">end</span>

IO.puts(My.sum([1, 2, 3, 4, 5, 6, 7]))   <span style="color:#6b7280;font-style:italic"># 28</span>`}</CodeBlock>

      <h3 style={styles.h3}>Lambda functions (anonymous functions)</h3>
      <p style={styles.p}>Lambda expressions are nameless functions. In Elixir they are defined with <code>fn ... end</code>. You call them with a dot: <code>func.(args)</code>. This dot is unique to anonymous functions — a deliberate design choice.</p>
      <CodeBlock>{`add = <span style="color:#a855f7">fn</span> a, b -> a + b <span style="color:#a855f7">end</span>
IO.puts(add.(3, 4))   <span style="color:#6b7280;font-style:italic"># 7</span>

<span style="color:#6b7280;font-style:italic"># Functions are first-class — pass as arguments</span>
double = <span style="color:#a855f7">fn</span> x -> x * 2 <span style="color:#a855f7">end</span>
Enum.map([1, 2, 3], double)   <span style="color:#6b7280;font-style:italic"># [2, 4, 6]</span>`}</CodeBlock>

      <h3 style={styles.h3}>Closures — the "backpack" metaphor</h3>
      <p style={styles.p}>A closure is a lambda that also captures (locks in) the variables from its surrounding scope at the moment it was defined. Even if those variables change later, the closure keeps its original snapshot.</p>
      <Highlight>Think of it as a backpack: when the function is born, it packs in the current value of the variables it uses. It carries this backpack forever, ignoring any later changes to those variables.</Highlight>
      <CodeBlock>{`x = 100
f = <span style="color:#a855f7">fn</span> -> IO.puts(x) <span style="color:#a855f7">end</span>
f.()      <span style="color:#6b7280;font-style:italic"># 100 — captured x=100 at definition</span>
x = 500
f.()      <span style="color:#6b7280;font-style:italic"># 100 — STILL 100! The closure ignores the new x</span>

f1 = <span style="color:#a855f7">fn</span> -> IO.puts(x) <span style="color:#a855f7">end</span>   <span style="color:#6b7280;font-style:italic"># new closure captures x=500</span>
f1.()     <span style="color:#6b7280;font-style:italic"># 500</span>

x = 300
f2 = <span style="color:#a855f7">fn</span> a -> IO.puts(a * x) <span style="color:#a855f7">end</span>   <span style="color:#6b7280;font-style:italic"># x=300 captured</span>
f2.(3)    <span style="color:#6b7280;font-style:italic"># 900  (not 1500, because x was 300 when f2 was defined)</span>`}</CodeBlock>
      <p style={{ fontSize: 13, color: "#6b7280" }}>Lambda vs closure: all closures are lambdas, but not all lambdas are closures. A lambda is just a nameless function. A closure additionally includes lexical (static) scoping of its surrounding variables.</p>

      <h3 style={styles.h3}>Private functions with <code>defp</code></h3>
      <CodeBlock>{`<span style="color:#a855f7">defmodule</span> <span style="color:#3b82f6">MyList</span> <span style="color:#a855f7">do</span>
  <span style="color:#a855f7">def</span> <span style="color:#3b82f6">reverse</span>(list), <span style="color:#a855f7">do</span>: do_reverse(list, [])

  <span style="color:#a855f7">defp</span> <span style="color:#3b82f6">do_reverse</span>([], acc), <span style="color:#a855f7">do</span>: acc            <span style="color:#6b7280;font-style:italic"># private helper</span>
  <span style="color:#a855f7">defp</span> <span style="color:#3b82f6">do_reverse</span>([head | tail], acc),
    <span style="color:#a855f7">do</span>: do_reverse(tail, [head | acc])
<span style="color:#a855f7">end</span>

IO.inspect(MyList.reverse([1, 2, 3, 4]))   <span style="color:#6b7280;font-style:italic"># [4, 3, 2, 1]</span>`}</CodeBlock>
    </div>
  );
}

function RecursionSection() {
  return (
    <div>
      <h2 style={styles.h2}>Recursion & tail recursion</h2>

      <h3 style={styles.h3}>Why recursion instead of loops?</h3>
      <p style={styles.p}>In imperative languages you write <code>{"for(i=0; i<10; i++)"}</code> — but this mutates <code>i</code>, which is a side effect. In Elixir, there are no traditional loops. Instead, we must use recursion to iterate. This is not a limitation — it's a deliberate design that enforces immutability.</p>

      <h3 style={styles.h3}>Standard recursion — and its problem</h3>
      <CodeBlock>{`<span style="color:#6b7280;font-style:italic">// JavaScript equivalent — not tail recursive</span>
function factorial(n) {
  if (n === 0) { return 1; }
  return n * factorial(n - 1);  <span style="color:#6b7280;font-style:italic">// multiplication AFTER recursive call</span>
}`}</CodeBlock>
      <Highlight>Every recursive call creates a new stack frame because the compiler must remember the pending multiplication. For large n, this overflows the call stack — a fatal memory fault.</Highlight>

      <h3 style={styles.h3}>Tail recursion — the compiler's trick</h3>
      <p style={styles.p}>A function is tail recursive if the recursive call is the very last operation — no pending work left to do after it. The BEAM VM can then reuse the same stack frame instead of creating a new one.</p>
      <div style={styles.compareGrid}>
        <CompareCard variant="bad" title="Standard (NOT tail-recursive)">
          <CodeBlock>{`<span style="color:#ef4444">def factorial(0), do: 1
def factorial(n),
  do: n * factorial(n-1)
# n * ... happens AFTER recursion
# Creates N stack frames</span>`}</CodeBlock>
        </CompareCard>
        <CompareCard variant="good" title="Tail-recursive (with accumulator)">
          <CodeBlock>{`<span style="color:#10b981">def factorial(n), do: fact(n, 1)
defp fact(0, acc), do: acc
defp fact(n, acc),
  do: fact(n-1, acc*n)
# Recursion is the LAST step
# Single stack frame reused!</span>`}</CodeBlock>
        </CompareCard>
      </div>

      <h3 style={styles.h3}>How tail recursion works (step by step)</h3>
      <div style={styles.card}>
        {[
          "Function called with initial arguments → stack frame created.",
          "Compiler identifies the function is tail-recursive.",
          "Instead of creating a new stack frame for each recursion, it reuses the current one by updating arguments in place.",
          "Program jumps back to the beginning of the function.",
          "Process continues until the base case is reached.",
          "Result returned from the single frame that's been reused throughout.",
        ].map((step, i) => (
          <p key={i} style={{ fontSize: 13, marginBottom: 4 }}><strong>{i + 1}.</strong> {step}</p>
        ))}
      </div>

      <h3 style={styles.h3}>The accumulator pattern</h3>
      <p style={styles.p}>To make recursion tail-optimized, carry the running result forward in a variable called an accumulator (<code>acc</code>). Instead of doing work after the recursive call, fold the work into the next call's arguments.</p>
      <CodeBlock>{`<span style="color:#a855f7">defmodule</span> <span style="color:#3b82f6">MyList</span> <span style="color:#a855f7">do</span>
  <span style="color:#6b7280;font-style:italic"># Public API — user doesn't see the acc</span>
  <span style="color:#a855f7">def</span> <span style="color:#3b82f6">reverse</span>(list), <span style="color:#a855f7">do</span>: do_reverse(list, [])

  <span style="color:#6b7280;font-style:italic"># Private tail-recursive helper with accumulator</span>
  <span style="color:#a855f7">defp</span> <span style="color:#3b82f6">do_reverse</span>([], acc), <span style="color:#a855f7">do</span>: acc
  <span style="color:#a855f7">defp</span> <span style="color:#3b82f6">do_reverse</span>([head | tail], acc),
    <span style="color:#a855f7">do</span>: do_reverse(tail, [head | acc])   <span style="color:#6b7280;font-style:italic"># last op = recursion</span>
<span style="color:#a855f7">end</span>

IO.inspect(MyList.reverse([<span style="color:#10b981">"ab"</span>, <span style="color:#10b981">"cd"</span>, <span style="color:#10b981">"ef"</span>]))   <span style="color:#6b7280;font-style:italic"># ["ef", "cd", "ab"]</span>`}</CodeBlock>
      <Highlight>The naive version uses <code>++</code> after the recursive call (not tail-recursive and slow). The accumulator version passes the result forward — tail-recursive and efficient.</Highlight>

      <h3 style={styles.h3}>Sum a list — simple recursion</h3>
      <CodeBlock>{`<span style="color:#6b7280;font-style:italic"># Simple recursion (not tail-recursive)</span>
<span style="color:#a855f7">defmodule</span> <span style="color:#3b82f6">My</span> <span style="color:#a855f7">do</span>
  <span style="color:#a855f7">def</span> <span style="color:#3b82f6">sum</span>([]), <span style="color:#a855f7">do</span>: 0
  <span style="color:#a855f7">def</span> <span style="color:#3b82f6">sum</span>([head | tail]), <span style="color:#a855f7">do</span>: head + sum(tail)
<span style="color:#a855f7">end</span>

IO.puts(My.sum([1, 2, 3, 4, 5, 6, 7]))   <span style="color:#6b7280;font-style:italic"># 28</span>`}</CodeBlock>
    </div>
  );
}

function EnumsPipesSection() {
  return (
    <div>
      <h2 style={styles.h2}>Enums, streams & the pipe operator</h2>

      <h3 style={styles.h3}>The Enum module</h3>
      <p style={styles.p}>Lists are enumerables. The <code>Enum</code> module provides higher-order functions to work with them without writing explicit recursion every time. Enums are <strong>eager</strong> — they evaluate immediately.</p>
      <CodeBlock>{`Enum.sum([1, 2, 3])            <span style="color:#6b7280;font-style:italic"># 6</span>
Enum.map([1, 2, 3], <span style="color:#a855f7">fn</span> x -> x * 2 <span style="color:#a855f7">end</span>)    <span style="color:#6b7280;font-style:italic"># [2, 4, 6]</span>
Enum.filter([1,2,3,4], <span style="color:#a855f7">fn</span> x -> x > 2 <span style="color:#a855f7">end</span>)  <span style="color:#6b7280;font-style:italic"># [3, 4]</span>
Enum.reduce([1,2,3], 0, <span style="color:#a855f7">fn</span> x, acc -> x + acc <span style="color:#a855f7">end</span>)  <span style="color:#6b7280;font-style:italic"># 6</span>`}</CodeBlock>

      <h3 style={styles.h3}>Streams — lazy evaluation</h3>
      <p style={styles.p}><code>Stream</code> is like <code>Enum</code> but lazy — it doesn't process elements until you ask for them. Use for large or infinite sequences where you don't need everything at once.</p>
      <CodeBlock>{`<span style="color:#6b7280;font-style:italic"># Enum: processes all 1_000_000 elements immediately</span>
Enum.map(1..1_000_000, <span style="color:#a855f7">fn</span> x -> x * 2 <span style="color:#a855f7">end</span>) |> Enum.take(5)

<span style="color:#6b7280;font-style:italic"># Stream: only processes 5 elements total — much more efficient</span>
Stream.map(1..1_000_000, <span style="color:#a855f7">fn</span> x -> x * 2 <span style="color:#a855f7">end</span>) |> Enum.take(5)`}</CodeBlock>

      <h3 style={styles.h3}>The pipe operator <code>|&gt;</code></h3>
      <p style={styles.p}>One of Elixir's most loved features. It chains function calls by passing the result of the left side as the first argument to the right side. Makes code read left-to-right like a data pipeline.</p>
      <Highlight>
        Without pipe: <code>{"Enum.sum(Enum.map([1,2,3], fn x → x*2 end))"}</code><br />
        With pipe: <code>{"Enum.map([1,2,3], fn x → x*2 end) |> Enum.sum()"}</code>
      </Highlight>
      <CodeBlock>{`<span style="color:#6b7280;font-style:italic"># These are exactly equivalent:</span>
Enum.sum(Enum.map([1, 2, 3], <span style="color:#a855f7">fn</span> x -> x * 2 <span style="color:#a855f7">end</span>))

Enum.map([1, 2, 3], <span style="color:#a855f7">fn</span> x -> x * 2 <span style="color:#a855f7">end</span>)
|> Enum.sum()

<span style="color:#6b7280;font-style:italic"># Longer pipelines read like a recipe:</span>
[1, 2, 3, 4, 5]
|> Enum.filter(<span style="color:#a855f7">fn</span> x -> rem(x, 2) == 0 <span style="color:#a855f7">end</span>)  <span style="color:#6b7280;font-style:italic"># keep evens</span>
|> Enum.map(<span style="color:#a855f7">fn</span> x -> x * x <span style="color:#a855f7">end</span>)             <span style="color:#6b7280;font-style:italic"># square them</span>
|> Enum.sum()                               <span style="color:#6b7280;font-style:italic"># add up</span>`}</CodeBlock>

      <h3 style={styles.h3}>Simplicity — the FP design philosophy</h3>
      <p style={styles.p}>There tends to be a simple syntactic design with functional programming. Program design is typically much smaller — a lot of thinking involved for not a lot of code. Elixir programs tend to be compact and expressive precisely because functions compose cleanly.</p>
    </div>
  );
}

// ── Quiz data ─────────────────────────────────────
const questions = [
  { q: "What does the = operator do in Elixir?", opts: ["Assigns a value to a variable", "Performs a pattern match", "Compares two values for equality", "Binds an atom to a function"], ans: 1, exp: "In Elixir, = is the match operator. It tries to make the left side match the right side, binding variables along the way. It is NOT simple assignment." },
  { q: "What will IO.puts([1, 2, 3]) do?", opts: ["Print [1, 2, 3]", "Print 1 2 3 on separate lines", "Throw an error — lists are special in Elixir", "Print nothing"], ans: 2, exp: "IO.puts prints strings only. Lists are special and cause an error. Use IO.inspect([1, 2, 3]) instead." },
  { q: "A closure captures variables from its surrounding scope...", opts: ["At the time the function is called", "At the time the function is defined", "Every time the variable changes", "Only when the variable is an atom"], ans: 1, exp: "Closures use lexical (static) scoping. They capture the value of variables at the moment of definition — the backpack is packed when the function is born, not when it runs." },
  { q: "Which function is tail-recursive?", opts: ["def f(0), do: 1 / def f(n), do: n * f(n-1)", "defp go([], acc), do: acc / defp go([h|t], acc), do: go(t, [h|acc])", "def sum([]), do: 0 / def sum([h|t]), do: h + sum(t)", "def reverse([]), do: [] / def reverse([h|t]), do: reverse(t) ++ [h]"], ans: 1, exp: "Option B is tail-recursive: the recursive call go(t, [h|acc]) is the absolute last operation. Options A, C, and D all have pending work (multiplication, addition, ++) that happens after the recursive call." },
  { q: "What is an accumulator in Elixir recursion?", opts: ["A built-in module for collecting results", "A variable that carries the running result forward through recursive calls", "The tail of a list", "A private function that accumulates errors"], ans: 1, exp: "An accumulator (acc) is a variable used in recursive functions to hold the running result as recursion progresses. It's passed as an extra argument so the recursive call is always the last operation." },
  { q: "What does |> (the pipe operator) do?", opts: ["Passes the result of the left expression as the LAST argument to the right function", "Passes the result of the left expression as the FIRST argument to the right function", "Concatenates two lists", "Creates a stream from an enum"], ans: 1, exp: "The pipe operator |> passes the result of the left side as the first argument to the right side." },
  { q: "In Elixir, tuples are written with...", opts: ["Square brackets []", "Curly braces {}", "Parentheses ()", "Angle brackets <>"], ans: 1, exp: "Tuples use curly braces: {1, 2, 3}. Lists use square brackets: [1, 2, 3]. This distinction matters for pattern matching." },
  { q: "What is the key difference between Enum and Stream?", opts: ["Enum works on lists, Stream works on tuples", "Enum is eager (evaluates immediately), Stream is lazy (evaluates on demand)", "Stream is faster for small lists, Enum is faster for large ones", "There is no difference"], ans: 1, exp: "Enum is eager — it processes all elements immediately. Stream is lazy — it only processes elements when you ask for them." },
  { q: "Why must Elixir use recursion instead of for-loops?", opts: ["Elixir doesn't have a for keyword at all", "For-loops are slower than recursion", "Traditional for-loops mutate state (e.g., a counter variable), which violates immutability", "Recursion compiles to smaller bytecode on the BEAM VM"], ans: 2, exp: "A for-loop like for(i=0; i<10; i++) mutates i — a side effect. Functional programming avoids side effects. Recursion achieves iteration without any mutation." },
  { q: "What virtual machine does Elixir run on?", opts: ["JVM (Java Virtual Machine)", "BEAM (Erlang VM)", "CPython interpreter", "V8 (JavaScript engine)"], ans: 1, exp: "Elixir runs on BEAM — the Bogdan/Björn's Erlang Abstract Machine. This gives it Erlang's fault-tolerance and concurrency capabilities." },
];

function QuizSection() {
  const [current, setCurrent] = useState(0);
  const [score, setScore]     = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  function pick(i) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.ans) setScore((s) => s + 1);
  }

  function next() {
    if (current < questions.length - 1) { setCurrent((c) => c + 1); setSelected(null); }
    else setFinished(true);
  }

  function prev() {
    if (current > 0) { setCurrent((c) => c - 1); setSelected(null); }
  }

  function restart() { setCurrent(0); setScore(0); setSelected(null); setFinished(false); }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const msg = pct >= 80 ? "Excellent! You have mastered the material."
              : pct >= 60 ? "Good progress! Review the sections you missed."
              :              "Keep studying — revisit the tabs above.";
    return (
      <div>
        <h2 style={styles.h2}>Test yourself</h2>
        <div style={{ ...styles.card, textAlign: "center", padding: "2rem" }}>
          <div style={{ fontSize: 40, fontWeight: 700, marginBottom: 8 }}>{score}/{questions.length}</div>
          <div style={{ fontSize: 16, color: "#6b7280", marginBottom: 20 }}>{pct}% — {msg}</div>
          <button style={styles.navBtn} onClick={restart}>Restart quiz</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 style={styles.h2}>Test yourself</h2>
      <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>
        Question {current + 1} of {questions.length} &nbsp;|&nbsp; Score: {score}
      </div>
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: "#111827" }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {q.opts.map((opt, i) => {
          let extra = {};
          if (selected !== null) {
            if (i === q.ans) extra = { background: "#f0fdf4", borderColor: "#16a34a", color: "#16a34a" };
            else if (i === selected) extra = { background: "#fef2f2", borderColor: "#dc2626", color: "#dc2626" };
          }
          return (
            <button key={i} style={{ ...styles.quizOpt, ...extra }} onClick={() => pick(i)}>
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div style={{ ...styles.quizFeedback, ...(selected === q.ans ? styles.feedbackOk : styles.feedbackFail) }}>
          {selected === q.ans ? "✓ Correct! " : "✗ Not quite. "}{q.exp}
        </div>
      )}
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        {current > 0 && <button style={styles.navBtn} onClick={prev}>← Previous</button>}
        <button style={styles.navBtn} onClick={next}>
          {current < questions.length - 1 ? "Next →" : "See results"}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════

const TABS = [
  { id: "overview",     label: "Overview",      Component: OverviewSection     },
  { id: "fp-concepts",  label: "FP Concepts",   Component: FPConceptsSection   },
  { id: "elixir-basics",label: "Elixir basics", Component: ElixirBasicsSection },
  { id: "data-types",   label: "Data types",    Component: DataTypesSection    },
  { id: "functions",    label: "Functions",     Component: FunctionsSection    },
  { id: "recursion",    label: "Recursion",     Component: RecursionSection    },
  { id: "enums-pipes",  label: "Enums & pipes", Component: EnumsPipesSection   },
  { id: "quiz",         label: "Quiz",          Component: QuizSection         },
];

export default function ElixirStudyGuide() {
  const [activeTab, setActiveTab] = useState("overview");
  const ActiveSection = TABS.find((t) => t.id === activeTab)?.Component ?? OverviewSection;

  return (
    <div style={styles.root}>
      <h1 style={styles.srOnly}>Elixir and Functional Programming — Complete Study Guide</h1>
      <div style={styles.guide}>
        {/* Tab bar */}
        <div style={styles.tabBar}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              style={{ ...styles.tab, ...(activeTab === tab.id ? styles.tabActive : {}) }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active section */}
        <ActiveSection />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
//  STYLES  (all inline — zero external CSS required)
// ══════════════════════════════════════════════════
const styles = {
  srOnly: { position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" },
  root: {
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: "#111827",
    background: "#ffffff",
    minHeight: "100vh",
    padding: "1.5rem",
  },
  guide: { maxWidth: 720, margin: "0 auto" },

  // Tabs
  tabBar: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1.5rem", borderBottom: "1px solid #e5e7eb", paddingBottom: "0.75rem" },
  tab: { background: "transparent", border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer", color: "#6b7280", fontFamily: "inherit", transition: "all 0.15s" },
  tabActive: { background: "#eff6ff", color: "#2563eb", borderColor: "#93c5fd", fontWeight: 600 },

  // Typography
  h2: { fontSize: 20, fontWeight: 700, marginBottom: "1rem", color: "#111827" },
  h3: { fontSize: 15, fontWeight: 600, margin: "1.25rem 0 0.5rem", color: "#111827" },
  p:  { fontSize: 14, lineHeight: 1.7, color: "#374151", marginBottom: "0.75rem" },

  // Cards
  card: { background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: "1rem 1.25rem", marginBottom: "0.75rem" },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: "1rem" },
  conceptCard:  { background: "#f3f4f6", borderRadius: 8, padding: "0.75rem 1rem" },
  conceptLabel: { fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#6b7280", marginBottom: 4 },
  conceptVal:   { fontSize: 14, fontWeight: 600, color: "#111827" },
  conceptSub:   { fontSize: 12, color: "#6b7280", marginTop: 2 },

  // Code
  pre: {
    background: "#1e1e2e",
    border: "1px solid #374151",
    borderRadius: 8,
    padding: "0.75rem 1rem",
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: 12.5,
    lineHeight: 1.6,
    overflowX: "auto",
    margin: "0.5rem 0 1rem",
    color: "#e2e8f0",
  },

  // Highlight callout
  highlight: {
    background: "#fffbeb",
    borderLeft: "3px solid #f59e0b",
    padding: "0.5rem 0.75rem",
    borderRadius: "0 6px 6px 0",
    fontSize: 13,
    lineHeight: 1.6,
    color: "#111827",
    margin: "0.5rem 0 1rem",
  },

  // Compare grid
  compareGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1rem" },
  compareCard:  { borderRadius: 8, padding: "0.75rem 1rem", fontSize: 13, lineHeight: 1.6 },
  compareBad:   { background: "#fef2f2", border: "1px solid #fecaca" },
  compareGood:  { background: "#f0fdf4", border: "1px solid #bbf7d0" },
  compareTitle: { fontWeight: 600, fontSize: 12, marginBottom: 6 },

  // Badge
  badge: { display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, marginRight: 4, marginBottom: 4 },

  // Tree icon
  treeIcon: { width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 },

  // Divider
  divider: { border: "none", borderTop: "1px solid #e5e7eb", margin: "1.25rem 0" },

  // Quiz
  quizOpt: { background: "transparent", border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 12px", fontSize: 13, cursor: "pointer", textAlign: "left", color: "#111827", fontFamily: "inherit", transition: "all 0.15s" },
  quizFeedback: { fontSize: 13, padding: "8px 12px", borderRadius: 8, marginBottom: "0.75rem", lineHeight: 1.5 },
  feedbackOk:   { background: "#f0fdf4", color: "#15803d" },
  feedbackFail: { background: "#fef2f2", color: "#dc2626" },
  navBtn: { background: "transparent", border: "1px solid #d1d5db", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", color: "#111827", fontFamily: "inherit" },
};
