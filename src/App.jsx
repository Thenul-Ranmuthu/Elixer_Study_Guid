import { useState } from "react";

/* ─────────────────────────────────────────────
   Elixir & Functional Programming Study Guide
   Enhanced UI — dark academic / terminal aesthetic
   ───────────────────────────────────────────── */

// ── Syntax-highlighted code block ──────────────
function CodeBlock({ children }) {
  return (
    <div style={styles.preWrapper}>
      <div style={styles.preDots}>
        <span style={{ ...styles.dot, background: "#ff5f57" }} />
        <span style={{ ...styles.dot, background: "#febc2e" }} />
        <span style={{ ...styles.dot, background: "#28c840" }} />
      </div>
      <div style={styles.preScroll}>
        <pre style={styles.pre}>
          <code style={styles.code} dangerouslySetInnerHTML={{ __html: children }} />
        </pre>
      </div>
    </div>
  );
}

// ── Highlight callout box ───────────────────────
function Highlight({ children }) {
  return <div style={styles.highlight}>{children}</div>;
}

// ── Concept card ───────────────────────────────
function ConceptCard({ label, value, sub, accent }) {
  const accents = {
    purple: { border: "#a855f7", glow: "rgba(168,85,247,0.15)", badge: "#a855f7" },
    teal: { border: "#14b8a6", glow: "rgba(20,184,166,0.15)", badge: "#14b8a6" },
    amber: { border: "#f59e0b", glow: "rgba(245,158,11,0.15)", badge: "#f59e0b" },
    rose: { border: "#f43f5e", glow: "rgba(244,63,94,0.15)", badge: "#f43f5e" },
    blue: { border: "#3b82f6", glow: "rgba(59,130,246,0.15)", badge: "#3b82f6" },
  };
  const a = accents[accent] || accents.purple;
  return (
    <div style={{ ...styles.conceptCard, borderTop: `3px solid ${a.border}`, boxShadow: `0 4px 20px ${a.glow}` }}>
      <div style={{ ...styles.conceptLabel, color: a.badge }}>{label}</div>
      <div style={styles.conceptVal}>{value}</div>
      {sub && <div style={styles.conceptSub}>{sub}</div>}
    </div>
  );
}

// ── Compare card ───────────────────────────────
function CompareCard({ variant, title, children }) {
  const isGood = variant === "good";
  return (
    <div style={{ ...styles.compareCard, ...(isGood ? styles.compareGood : styles.compareBad) }}>
      <div style={{ ...styles.compareTitle, color: isGood ? "#34d399" : "#fb7185" }}>
        <span style={{ marginRight: 6 }}>{isGood ? "✓" : "✗"}</span>{title}
      </div>
      {children}
    </div>
  );
}

// ── Badge ───────────────────────────────────────
function Badge({ variant, children }) {
  const colors = {
    info: { background: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)" },
    success: { background: "rgba(52,211,153,0.15)", color: "#34d399", border: "1px solid rgba(52,211,153,0.3)" },
    warn: { background: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)" },
    danger: { background: "rgba(251,113,133,0.15)", color: "#fb7185", border: "1px solid rgba(251,113,133,0.3)" },
  };
  return <span style={{ ...styles.badge, ...colors[variant] }}>{children}</span>;
}

// ══════════════════════════════════════════════════
//  TAB SECTIONS
// ══════════════════════════════════════════════════

function OverviewSection() {
  return (
    <div>
      <SectionHeader icon="⚗️" title="What this lecture is about" />
      <p style={styles.p}>
        This is Lecture 4 on Functional Programming (Programming Languages unit, Arlen Brower / David
        McMeekin). Together with the "Thinking in Functions" supplement and Kalpani's additional notes,
        it covers the entire conceptual and practical foundation of Elixir.
      </p>

      <div style={styles.cardGrid}>
        <ConceptCard accent="purple" label="Language" value="Elixir" sub="Runs on BEAM (Erlang VM)" />
        <ConceptCard accent="teal" label="Paradigm" value="Functional" sub="No classes, no mutable state" />
        <ConceptCard accent="amber" label="Style" value="Declarative" sub="Describe what, not how" />
        <ConceptCard accent="rose" label="Strengths" value="Concurrency" sub="Fault-tolerant, scalable" />
      </div>

      <SubHeader>The functional family tree</SubHeader>
      <div style={styles.card}>
        {[
          { indent: 0, color: "#94a3b8", bg: "rgba(148,163,184,0.12)", id: "L", name: "LISP", desc: "John McCarthy, 1958. First functional language. Needed recursion + linked lists for AI." },
          { indent: 2, color: "#60a5fa", bg: "rgba(96,165,250,0.12)", id: "S", name: "Scheme", desc: "MIT, mid-1970s. Statically scoped, functions as first-class entities." },
          { indent: 2, color: "#60a5fa", bg: "rgba(96,165,250,0.12)", id: "CL", name: "Common Lisp", desc: "Combined many Lisp dialects to solve portability issues." },
          { indent: 2, color: "#fbbf24", bg: "rgba(251,191,36,0.12)", id: "Er", name: "Erlang", desc: "Ericsson, telecom. Scalable, fault-tolerant. Verbose syntax." },
          { indent: 4, color: "#a855f7", bg: "rgba(168,85,247,0.12)", id: "Ex", name: "Elixir", desc: "Modern syntax on BEAM VM. Powers WhatsApp, RabbitMQ. \"A little nicer.\"" },
        ].map((row) => (
          <div key={row.id} style={{ display: "flex", alignItems: "center", gap: 12, paddingLeft: `${row.indent * 0.6}rem`, marginBottom: 10 }}>
            <div style={{ ...styles.treeIcon, background: row.bg, color: row.color, border: `1px solid ${row.color}40` }}>{row.id}</div>
            <div style={{ fontSize: 13 }}>
              <strong style={{ color: "#e2e8f0" }}>{row.name}</strong>{" "}
              <span style={{ color: "#94a3b8" }}>— {row.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <SubHeader>The 3 key requirements</SubHeader>
      <p style={styles.p}>To process symbolic data in linked lists, you need:</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "0.75rem" }}>
        <Badge variant="info">1. Recursion</Badge>
        <Badge variant="success">2. Conditional expressions</Badge>
        <Badge variant="warn">3. Dynamic allocation of linked lists</Badge>
      </div>
      <p style={{ ...styles.p, fontSize: 13, color: "#94a3b8" }}>
        Elixir satisfies all three natively. These aren't optional extras — they are the engine of the language.
      </p>
    </div>
  );
}

function FPConceptsSection() {
  return (
    <div>
      <SectionHeader icon="🧮" title="Functional programming concepts" />

      <SubHeader>The paradigm shift: von Neumann vs. Mathematical evaluation</SubHeader>
      <div style={styles.compareGrid}>
        <CompareCard variant="bad" title="Imperative (von Neumann)">
          <CodeBlock>{`<span style="color:#fb7185">static int x = 1;\nx = x * 2;  // overwrites memory\nreturn x;   // side-effect!</span>`}</CodeBlock>
          <p style={{ fontSize: 12, marginTop: 6, color: "#fb7185" }}>Programs and data in memory. Iteration efficient. But state causes bugs.</p>
        </CompareCard>
        <CompareCard variant="good" title="Functional (Mathematical)">
          <CodeBlock>{`<span style="color:#34d399">f(x) = x³\nx = 2 → f(2) = 8\n# No memory overwrite</span>`}</CodeBlock>
          <p style={{ fontSize: 12, marginTop: 6, color: "#34d399" }}>Parameters mapped to values directly. No state. Pure evaluation.</p>
        </CompareCard>
      </div>

      <SubHeader>Pure functions</SubHeader>
      <Highlight>Same input → same output. Always. No side effects. This makes code modular, highly concurrent, and trivial to test.</Highlight>
      <CodeBlock>{`<span style="color:#64748b;font-style:italic"># Pure: output depends only on input</span>
<span style="color:#c084fc">defmodule</span> <span style="color:#60a5fa">Math</span> <span style="color:#c084fc">do</span>
  <span style="color:#c084fc">def</span> <span style="color:#60a5fa">square</span>(x), <span style="color:#c084fc">do</span>: x * x
<span style="color:#c084fc">end</span>

<span style="color:#64748b;font-style:italic"># Impure: reads/modifies external state — AVOID in FP</span>
<span style="color:#64748b;font-style:italic"># static int counter = 0; counter++;</span>`}</CodeBlock>

      <SubHeader>Immutability: transformation, not mutation</SubHeader>
      <p style={styles.p}>In Elixir, data never changes. Functions take in data and return brand new, transformed data. This eliminates race conditions in concurrent systems.</p>
      <div style={styles.compareGrid}>
        <CompareCard variant="bad" title="Imperative (mutates)">
          <CodeBlock>{`<span style="color:#fb7185">[1,2,3] → [1,9,3]\n# Same variable overwritten</span>`}</CodeBlock>
        </CompareCard>
        <CompareCard variant="good" title="Functional (transforms)">
          <CodeBlock>{`<span style="color:#34d399">[1,2,3] → function → [1,9,3]  (new)\n[1,2,3]  ← original untouched</span>`}</CodeBlock>
        </CompareCard>
      </div>
      <CodeBlock>{`<span style="color:#64748b;font-style:italic"># put_elem returns a NEW tuple — aTuple unchanged</span>
aTuple = {1, 2, 3}
newTuple = put_elem(aTuple, 1, 10)
<span style="color:#64748b;font-style:italic"># aTuple is still {1, 2, 3}</span>
<span style="color:#64748b;font-style:italic"># newTuple is {1, 10, 3}</span>`}</CodeBlock>

      <SubHeader>Avoiding side effects</SubHeader>
      <p style={styles.p}>FP tries to avoid side effects — anything that modifies state outside a function. The hidden cost of state: NULL pointer dereferences, buffer overflows, dangling pointers, stack overflows. Immutability eliminates all of these.</p>

      <SubHeader>The four pillars</SubHeader>
      <div style={styles.cardGrid}>
        <ConceptCard accent="purple" label="Rule" value="Pure functions" sub="Yields predictability & modularity" />
        <ConceptCard accent="teal" label="Data" value="Immutability" sub="Yields safe concurrency" />
        <ConceptCard accent="amber" label="Structure" value="Linked lists" sub="Yields natural recursive processing" />
        <ConceptCard accent="blue" label="Engine" value="Tail recursion" sub="Yields infinite iteration without overflow" />
      </div>
    </div>
  );
}

function ElixirBasicsSection() {
  return (
    <div>
      <SectionHeader icon="💜" title="Elixir basics" />

      <SubHeader>What Elixir is</SubHeader>
      <p style={styles.p}>Elixir is a functional, concurrent, fault-tolerant language running on the BEAM (Erlang Virtual Machine). It brings modern, cleaner syntax to Erlang's battle-tested infrastructure. Functions are the main building blocks — not classes or objects.</p>

      <SubHeader>Modules and functions</SubHeader>
      <CodeBlock>{`<span style="color:#c084fc">defmodule</span> <span style="color:#60a5fa">Greeting</span> <span style="color:#c084fc">do</span>
  <span style="color:#c084fc">def</span> <span style="color:#60a5fa">hello</span>(name) <span style="color:#c084fc">do</span>
    <span style="color:#34d399">"Hello, \#{name}!"</span>
  <span style="color:#c084fc">end</span>
<span style="color:#c084fc">end</span>

<span style="color:#64748b;font-style:italic"># Short form (single expression)</span>
<span style="color:#c084fc">def</span> <span style="color:#60a5fa">hello</span>(name), <span style="color:#c084fc">do</span>: <span style="color:#34d399">"Hello, \#{name}!"</span>

<span style="color:#64748b;font-style:italic"># Private function (only callable within module)</span>
<span style="color:#c084fc">defp</span> <span style="color:#60a5fa">secret</span>(x), <span style="color:#c084fc">do</span>: x * 2`}</CodeBlock>

      <SubHeader>Variables</SubHeader>
      <p style={styles.p}>Variables in Elixir are <em>bound</em>, not assigned in the imperative sense. They cannot be mutated — rebinding creates a new binding.</p>
      <CodeBlock>{`x = 10
y = x + 5   <span style="color:#64748b;font-style:italic"># y = 15, x still = 10</span>
x = 20      <span style="color:#64748b;font-style:italic"># rebinding x — the old 10 is gone from this scope</span>`}</CodeBlock>

      <SubHeader>IO — printing output</SubHeader>
      <Highlight>
        <strong style={{ color: "#c084fc" }}>IO.puts</strong> — prints strings only (converts integers but NOT lists)<br />
        <strong style={{ color: "#c084fc" }}>IO.inspect</strong> — prints any data structure, great for debugging
      </Highlight>
      <CodeBlock>{`IO.puts(<span style="color:#34d399">"hello"</span>)       <span style="color:#64748b;font-style:italic"># OK</span>
IO.puts(123)          <span style="color:#64748b;font-style:italic"># OK (converted to "123")</span>
IO.puts([1, 2, 3])    <span style="color:#64748b;font-style:italic"># ERROR — lists are special in Elixir!</span>
IO.inspect([1, 2, 3]) <span style="color:#64748b;font-style:italic"># OK — use this for lists</span>`}</CodeBlock>

      <SubHeader>Erlang vs Elixir — same BEAM, better syntax</SubHeader>
      <p style={styles.p}>Your slides show a GenServer (server process) in both. The Erlang version requires ~20 lines with verbose attribute syntax. The Elixir version:</p>
      <CodeBlock>{`<span style="color:#c084fc">defmodule</span> <span style="color:#60a5fa">SumServer</span> <span style="color:#c084fc">do</span>
  <span style="color:#c084fc">use</span> GenServer

  <span style="color:#c084fc">def</span> <span style="color:#60a5fa">start</span> <span style="color:#c084fc">do</span>
    GenServer.start(__MODULE__, <span style="color:#fbbf24">nil</span>)
  <span style="color:#c084fc">end</span>

  <span style="color:#c084fc">def</span> <span style="color:#60a5fa">sum</span>(server, a, b) <span style="color:#c084fc">do</span>
    GenServer.call(server, {<span style="color:#fbbf24">:sum</span>, a, b})
  <span style="color:#c084fc">end</span>

  <span style="color:#c084fc">def</span> <span style="color:#60a5fa">handle_call</span>({<span style="color:#fbbf24">:sum</span>, a, b}, _from, state) <span style="color:#c084fc">do</span>
    {<span style="color:#fbbf24">:reply</span>, a + b, state}
  <span style="color:#c084fc">end</span>
<span style="color:#c084fc">end</span>`}</CodeBlock>
      <p style={{ fontSize: 13, color: "#94a3b8" }}>This is the same GenServer behaviour — just much cleaner. Elixir is a little nicer.</p>
    </div>
  );
}

function DataTypesSection() {
  return (
    <div>
      <SectionHeader icon="🔷" title="Elixir data types" />

      <SubHeader>Atoms</SubHeader>
      <p style={styles.p}>Atoms are labels for unique, immutable values. They evaluate to themselves and are fundamentally different from variables. Used as tags, status codes, and keys.</p>
      <CodeBlock>{`<span style="color:#fbbf24">:ok</span>
<span style="color:#fbbf24">:error</span>
<span style="color:#fbbf24">:sum</span>
<span style="color:#fbbf24">true</span>   <span style="color:#64748b;font-style:italic"># true and false are atoms</span>
<span style="color:#fbbf24">nil</span>    <span style="color:#64748b;font-style:italic"># nil is also an atom</span>`}</CodeBlock>
      <Highlight>Atoms start with a colon. They are like named constants that mean exactly what they say. Tuples often use an atom as a first element to signal a type, e.g. <code style={{ color: "#c084fc" }}>{"{:ok, value}"}</code> or <code style={{ color: "#c084fc" }}>{"{:error, reason}"}</code>.</Highlight>

      <SubHeader>Tuples</SubHeader>
      <p style={styles.p}>An ordered, fixed-size collection of values written using <code style={styles.inlineCode}>{"{}"}</code>. Can hold any data type. Immutable — once created, cannot be modified. Pattern matching works powerfully on tuples.</p>
      <CodeBlock>{`iex> {1, 2, 3}
{1, 2, 3}

iex> a = {1, 2, 3}

<span style="color:#64748b;font-style:italic"># Pattern matching — destructure a tuple into variables</span>
iex> {x, y, z} = {1, 2, 3}
iex> x   <span style="color:#64748b;font-style:italic"># 1</span>
iex> y   <span style="color:#64748b;font-style:italic"># 2</span>

<span style="color:#64748b;font-style:italic"># Literals in patterns must match exactly</span>
iex> {1, y, z} = {10, 2, 3}
<span style="color:#64748b;font-style:italic"># ** (MatchError) — 1 != 10</span>

<span style="color:#64748b;font-style:italic"># put_elem returns a brand new tuple</span>
new_tuple = put_elem(a, 1, 10)   <span style="color:#64748b;font-style:italic"># {1, 10, 3}</span>`}</CodeBlock>

      <SubHeader>Pattern matching — the key feature</SubHeader>
      <Highlight>The <code style={{ color: "#c084fc" }}>=</code> sign in Elixir is a <strong>match operator</strong>, not assignment. It tries to make the left side match the right side. Variables on the left get bound to values on the right.</Highlight>
      <CodeBlock>{`<span style="color:#64748b;font-style:italic"># Tuple pattern match</span>
{a, b, c} = {1, 2, 3}   <span style="color:#64748b;font-style:italic"># a=1, b=2, c=3</span>

<span style="color:#64748b;font-style:italic"># List pattern match</span>
[head | tail] = [1, 2, 3]   <span style="color:#64748b;font-style:italic"># head=1, tail=[2,3]</span>

<span style="color:#64748b;font-style:italic"># _ is a wildcard — "I don't care about this value"</span>
[a | _] = [1, 2, 3]   <span style="color:#64748b;font-style:italic"># a=1, ignore the rest</span>
<span style="color:#64748b;font-style:italic"># Note: _ cannot be used in expressions — only in patterns</span>`}</CodeBlock>

      <SubHeader>Lists</SubHeader>
      <p style={styles.p}>An ordered, linked collection of elements written with square brackets <code style={styles.inlineCode}>[]</code>. Immutable. Can hold mixed types. Structured as recursive <code style={styles.inlineCode}>[head | tail]</code>.</p>
      <CodeBlock>{`x = [1, 2, 3]
hd(x)   <span style="color:#64748b;font-style:italic"># 1  — the head (first element)</span>
tl(x)   <span style="color:#64748b;font-style:italic"># [2, 3]  — the tail (rest of list)</span>

<span style="color:#64748b;font-style:italic"># Construct a new list</span>
[1 | [2, 3]]   <span style="color:#64748b;font-style:italic"># [1, 2, 3]</span>

<span style="color:#64748b;font-style:italic"># Concatenate lists</span>
[1, 2] ++ [3, 4]   <span style="color:#64748b;font-style:italic"># [1, 2, 3, 4]</span>

<span style="color:#64748b;font-style:italic"># Lists can contain anything — even nested lists</span>
[1, 2, [<span style="color:#34d399">'b'</span>, <span style="color:#34d399">'c'</span>], 3, 4]`}</CodeBlock>
      <Highlight>In Lisp/Scheme: <code style={{ color: "#c084fc" }}>car</code> = head, <code style={{ color: "#c084fc" }}>cdr</code> = tail, <code style={{ color: "#c084fc" }}>cons</code> = construct a list. In Elixir: <code style={{ color: "#c084fc" }}>hd()</code>, <code style={{ color: "#c084fc" }}>tl()</code>, <code style={{ color: "#c084fc" }}>{"[h | t]"}</code>. Same idea, nicer syntax.</Highlight>

      <SubHeader>Lists as recursive structures</SubHeader>
      <p style={styles.p}>Lists can be thought of as: a head value + a tail (which is also a list). An empty tail <code style={styles.inlineCode}>[]</code> signals the end. This structure is what makes recursion on lists natural.</p>
      <CodeBlock>{`my_list = [head | tail]
<span style="color:#64748b;font-style:italic"># [1, 2, 3] is really [1 | [2 | [3 | []]]]</span>`}</CodeBlock>
    </div>
  );
}

function FunctionsSection() {
  return (
    <div>
      <SectionHeader icon="λ" title="Functions in Elixir" />

      <SubHeader>Named functions with pattern matching</SubHeader>
      <p style={styles.p}>Elixir uses pattern matching on function arguments to select which clause to execute. This replaces if/else chains and is the idiomatic way to write conditional logic.</p>
      <CodeBlock>{`<span style="color:#c084fc">defmodule</span> <span style="color:#60a5fa">Math</span> <span style="color:#c084fc">do</span>
  <span style="color:#c084fc">def</span> <span style="color:#60a5fa">factorial</span>(0), <span style="color:#c084fc">do</span>: 1           <span style="color:#64748b;font-style:italic"># base case</span>
  <span style="color:#c084fc">def</span> <span style="color:#60a5fa">factorial</span>(n), <span style="color:#c084fc">do</span>: n * factorial(n - 1)
<span style="color:#c084fc">end</span>

IO.puts(Math.factorial(5))   <span style="color:#64748b;font-style:italic"># 120</span>

<span style="color:#c084fc">defmodule</span> <span style="color:#60a5fa">My</span> <span style="color:#c084fc">do</span>
  <span style="color:#c084fc">def</span> <span style="color:#60a5fa">sum</span>([]), <span style="color:#c084fc">do</span>: 0
  <span style="color:#c084fc">def</span> <span style="color:#60a5fa">sum</span>([head | tail]), <span style="color:#c084fc">do</span>: head + sum(tail)
<span style="color:#c084fc">end</span>

IO.puts(My.sum([1, 2, 3, 4, 5, 6, 7]))   <span style="color:#64748b;font-style:italic"># 28</span>`}</CodeBlock>

      <SubHeader>Lambda functions (anonymous functions)</SubHeader>
      <p style={styles.p}>Lambda expressions are nameless functions. In Elixir they are defined with <code style={styles.inlineCode}>fn ... end</code>. You call them with a dot: <code style={styles.inlineCode}>func.(args)</code>. This dot is unique to anonymous functions — a deliberate design choice.</p>
      <CodeBlock>{`add = <span style="color:#c084fc">fn</span> a, b -> a + b <span style="color:#c084fc">end</span>
IO.puts(add.(3, 4))   <span style="color:#64748b;font-style:italic"># 7</span>

<span style="color:#64748b;font-style:italic"># Functions are first-class — pass as arguments</span>
double = <span style="color:#c084fc">fn</span> x -> x * 2 <span style="color:#c084fc">end</span>
Enum.map([1, 2, 3], double)   <span style="color:#64748b;font-style:italic"># [2, 4, 6]</span>`}</CodeBlock>

      <SubHeader>Closures — the "backpack" metaphor</SubHeader>
      <p style={styles.p}>A closure is a lambda that also captures (locks in) the variables from its surrounding scope at the moment it was defined. Even if those variables change later, the closure keeps its original snapshot.</p>
      <Highlight>Think of it as a backpack: when the function is born, it packs in the current value of the variables it uses. It carries this backpack forever, ignoring any later changes to those variables.</Highlight>
      <CodeBlock>{`x = 100
f = <span style="color:#c084fc">fn</span> -> IO.puts(x) <span style="color:#c084fc">end</span>
f.()      <span style="color:#64748b;font-style:italic"># 100 — captured x=100 at definition</span>
x = 500
f.()      <span style="color:#64748b;font-style:italic"># 100 — STILL 100! The closure ignores the new x</span>

f1 = <span style="color:#c084fc">fn</span> -> IO.puts(x) <span style="color:#c084fc">end</span>   <span style="color:#64748b;font-style:italic"># new closure captures x=500</span>
f1.()     <span style="color:#64748b;font-style:italic"># 500</span>

x = 300
f2 = <span style="color:#c084fc">fn</span> a -> IO.puts(a * x) <span style="color:#c084fc">end</span>   <span style="color:#64748b;font-style:italic"># x=300 captured</span>
f2.(3)    <span style="color:#64748b;font-style:italic"># 900  (not 1500, because x was 300 when f2 was defined)</span>`}</CodeBlock>
      <p style={{ fontSize: 13, color: "#94a3b8" }}>Lambda vs closure: all closures are lambdas, but not all lambdas are closures. A lambda is just a nameless function. A closure additionally includes lexical (static) scoping of its surrounding variables.</p>

      <SubHeader>Private functions with <code style={styles.inlineCode}>defp</code></SubHeader>
      <CodeBlock>{`<span style="color:#c084fc">defmodule</span> <span style="color:#60a5fa">MyList</span> <span style="color:#c084fc">do</span>
  <span style="color:#c084fc">def</span> <span style="color:#60a5fa">reverse</span>(list), <span style="color:#c084fc">do</span>: do_reverse(list, [])

  <span style="color:#c084fc">defp</span> <span style="color:#60a5fa">do_reverse</span>([], acc), <span style="color:#c084fc">do</span>: acc            <span style="color:#64748b;font-style:italic"># private helper</span>
  <span style="color:#c084fc">defp</span> <span style="color:#60a5fa">do_reverse</span>([head | tail], acc),
    <span style="color:#c084fc">do</span>: do_reverse(tail, [head | acc])
<span style="color:#c084fc">end</span>

IO.inspect(MyList.reverse([1, 2, 3, 4]))   <span style="color:#64748b;font-style:italic"># [4, 3, 2, 1]</span>`}</CodeBlock>
    </div>
  );
}

function RecursionSection() {
  return (
    <div>
      <SectionHeader icon="🔄" title="Recursion & tail recursion" />

      <SubHeader>Why recursion instead of loops?</SubHeader>
      <p style={styles.p}>In imperative languages you write <code style={styles.inlineCode}>{"for(i=0; i<10; i++)"}</code> — but this mutates <code style={styles.inlineCode}>i</code>, which is a side effect. In Elixir, there are no traditional loops. Instead, we must use recursion to iterate. This is not a limitation — it's a deliberate design that enforces immutability.</p>

      <SubHeader>Standard recursion — and its problem</SubHeader>
      <CodeBlock>{`<span style="color:#64748b;font-style:italic">// JavaScript equivalent — not tail recursive</span>
function factorial(n) {
  if (n === 0) { return 1; }
  return n * factorial(n - 1);  <span style="color:#64748b;font-style:italic">// multiplication AFTER recursive call</span>
}`}</CodeBlock>
      <Highlight>Every recursive call creates a new stack frame because the compiler must remember the pending multiplication. For large n, this overflows the call stack — a fatal memory fault.</Highlight>

      <SubHeader>Tail recursion — the compiler's trick</SubHeader>
      <p style={styles.p}>A function is tail recursive if the recursive call is the very last operation — no pending work left to do after it. The BEAM VM can then reuse the same stack frame instead of creating a new one.</p>
      <div style={styles.compareGrid}>
        <CompareCard variant="bad" title="Standard (NOT tail-recursive)">
          <CodeBlock>{`<span style="color:#fb7185">def factorial(0), do: 1
def factorial(n),
  do: n * factorial(n-1)
# n * ... happens AFTER recursion
# Creates N stack frames</span>`}</CodeBlock>
        </CompareCard>
        <CompareCard variant="good" title="Tail-recursive (with accumulator)">
          <CodeBlock>{`<span style="color:#34d399">def factorial(n), do: fact(n, 1)
defp fact(0, acc), do: acc
defp fact(n, acc),
  do: fact(n-1, acc*n)
# Recursion is the LAST step
# Single stack frame reused!</span>`}</CodeBlock>
        </CompareCard>
      </div>

      <SubHeader>How tail recursion works (step by step)</SubHeader>
      <div style={styles.card}>
        {[
          "Function called with initial arguments → stack frame created.",
          "Compiler identifies the function is tail-recursive.",
          "Instead of creating a new stack frame for each recursion, it reuses the current one by updating arguments in place.",
          "Program jumps back to the beginning of the function.",
          "Process continues until the base case is reached.",
          "Result returned from the single frame that's been reused throughout.",
        ].map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
            <span style={styles.stepNum}>{i + 1}</span>
            <p style={{ fontSize: 13, margin: 0, color: "#cbd5e1", lineHeight: 1.6 }}>{step}</p>
          </div>
        ))}
      </div>

      <SubHeader>The accumulator pattern</SubHeader>
      <p style={styles.p}>To make recursion tail-optimized, carry the running result forward in a variable called an accumulator (<code style={styles.inlineCode}>acc</code>). Instead of doing work after the recursive call, fold the work into the next call's arguments.</p>
      <CodeBlock>{`<span style="color:#c084fc">defmodule</span> <span style="color:#60a5fa">MyList</span> <span style="color:#c084fc">do</span>
  <span style="color:#64748b;font-style:italic"># Public API — user doesn't see the acc</span>
  <span style="color:#c084fc">def</span> <span style="color:#60a5fa">reverse</span>(list), <span style="color:#c084fc">do</span>: do_reverse(list, [])

  <span style="color:#64748b;font-style:italic"># Private tail-recursive helper with accumulator</span>
  <span style="color:#c084fc">defp</span> <span style="color:#60a5fa">do_reverse</span>([], acc), <span style="color:#c084fc">do</span>: acc
  <span style="color:#c084fc">defp</span> <span style="color:#60a5fa">do_reverse</span>([head | tail], acc),
    <span style="color:#c084fc">do</span>: do_reverse(tail, [head | acc])   <span style="color:#64748b;font-style:italic"># last op = recursion</span>
<span style="color:#c084fc">end</span>

IO.inspect(MyList.reverse([<span style="color:#34d399">"ab"</span>, <span style="color:#34d399">"cd"</span>, <span style="color:#34d399">"ef"</span>]))   <span style="color:#64748b;font-style:italic"># ["ef", "cd", "ab"]</span>`}</CodeBlock>
      <Highlight>The naive version uses <code style={{ color: "#c084fc" }}>++</code> after the recursive call (not tail-recursive and slow). The accumulator version passes the result forward — tail-recursive and efficient.</Highlight>

      <SubHeader>Sum a list — simple recursion</SubHeader>
      <CodeBlock>{`<span style="color:#64748b;font-style:italic"># Simple recursion (not tail-recursive)</span>
<span style="color:#c084fc">defmodule</span> <span style="color:#60a5fa">My</span> <span style="color:#c084fc">do</span>
  <span style="color:#c084fc">def</span> <span style="color:#60a5fa">sum</span>([]), <span style="color:#c084fc">do</span>: 0
  <span style="color:#c084fc">def</span> <span style="color:#60a5fa">sum</span>([head | tail]), <span style="color:#c084fc">do</span>: head + sum(tail)
<span style="color:#c084fc">end</span>

IO.puts(My.sum([1, 2, 3, 4, 5, 6, 7]))   <span style="color:#64748b;font-style:italic"># 28</span>`}</CodeBlock>
    </div>
  );
}

function EnumsPipesSection() {
  return (
    <div>
      <SectionHeader icon="🔗" title="Enums, streams & the pipe operator" />

      <SubHeader>The Enum module</SubHeader>
      <p style={styles.p}>Lists are enumerables. The <code style={styles.inlineCode}>Enum</code> module provides higher-order functions to work with them without writing explicit recursion every time. Enums are <strong>eager</strong> — they evaluate immediately.</p>
      <CodeBlock>{`Enum.sum([1, 2, 3])            <span style="color:#64748b;font-style:italic"># 6</span>
Enum.map([1, 2, 3], <span style="color:#c084fc">fn</span> x -> x * 2 <span style="color:#c084fc">end</span>)    <span style="color:#64748b;font-style:italic"># [2, 4, 6]</span>
Enum.filter([1,2,3,4], <span style="color:#c084fc">fn</span> x -> x > 2 <span style="color:#c084fc">end</span>)  <span style="color:#64748b;font-style:italic"># [3, 4]</span>
Enum.reduce([1,2,3], 0, <span style="color:#c084fc">fn</span> x, acc -> x + acc <span style="color:#c084fc">end</span>)  <span style="color:#64748b;font-style:italic"># 6</span>`}</CodeBlock>

      <SubHeader>Streams — lazy evaluation</SubHeader>
      <p style={styles.p}><code style={styles.inlineCode}>Stream</code> is like <code style={styles.inlineCode}>Enum</code> but lazy — it doesn't process elements until you ask for them. Use for large or infinite sequences where you don't need everything at once.</p>
      <CodeBlock>{`<span style="color:#64748b;font-style:italic"># Enum: processes all 1_000_000 elements immediately</span>
Enum.map(1..1_000_000, <span style="color:#c084fc">fn</span> x -> x * 2 <span style="color:#c084fc">end</span>) |> Enum.take(5)

<span style="color:#64748b;font-style:italic"># Stream: only processes 5 elements total — much more efficient</span>
Stream.map(1..1_000_000, <span style="color:#c084fc">fn</span> x -> x * 2 <span style="color:#c084fc">end</span>) |> Enum.take(5)`}</CodeBlock>

      <SubHeader>The pipe operator <code style={styles.inlineCode}>|&gt;</code></SubHeader>
      <p style={styles.p}>One of Elixir's most loved features. It chains function calls by passing the result of the left side as the first argument to the right side. Makes code read left-to-right like a data pipeline.</p>
      <Highlight>
        Without pipe: <code style={{ color: "#c084fc" }}>{"Enum.sum(Enum.map([1,2,3], fn x → x*2 end))"}</code><br />
        With pipe: <code style={{ color: "#34d399" }}>{"Enum.map([1,2,3], fn x → x*2 end) |> Enum.sum()"}</code>
      </Highlight>
      <CodeBlock>{`<span style="color:#64748b;font-style:italic"># These are exactly equivalent:</span>
Enum.sum(Enum.map([1, 2, 3], <span style="color:#c084fc">fn</span> x -> x * 2 <span style="color:#c084fc">end</span>))

Enum.map([1, 2, 3], <span style="color:#c084fc">fn</span> x -> x * 2 <span style="color:#c084fc">end</span>)
|> Enum.sum()

<span style="color:#64748b;font-style:italic"># Longer pipelines read like a recipe:</span>
[1, 2, 3, 4, 5]
|> Enum.filter(<span style="color:#c084fc">fn</span> x -> rem(x, 2) == 0 <span style="color:#c084fc">end</span>)  <span style="color:#64748b;font-style:italic"># keep evens</span>
|> Enum.map(<span style="color:#c084fc">fn</span> x -> x * x <span style="color:#c084fc">end</span>)             <span style="color:#64748b;font-style:italic"># square them</span>
|> Enum.sum()                               <span style="color:#64748b;font-style:italic"># add up</span>`}</CodeBlock>

      <SubHeader>Simplicity — the FP design philosophy</SubHeader>
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
  const [score, setScore] = useState(0);
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
    const msg = pct >= 80 ? "Excellent! You've mastered the material."
      : pct >= 60 ? "Good progress! Review the sections you missed."
        : "Keep studying — revisit the tabs above.";
    const color = pct >= 80 ? "#34d399" : pct >= 60 ? "#fbbf24" : "#fb7185";
    return (
      <div>
        <SectionHeader icon="🏆" title="Quiz results" />
        <div style={{ ...styles.card, textAlign: "center", padding: "2.5rem" }}>
          <div style={{ fontSize: 52, fontWeight: 800, marginBottom: 8, color, fontFamily: "'JetBrains Mono', monospace" }}>
            {score}/{questions.length}
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color, marginBottom: 8 }}>{pct}%</div>
          <div style={{ fontSize: 15, color: "#94a3b8", marginBottom: 28 }}>{msg}</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {questions.map((_, i) => {
              const wasCorrect = i < current || finished;
              return (
                <div key={i} style={{
                  width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700,
                  background: "rgba(148,163,184,0.1)", color: "#94a3b8", border: "1px solid rgba(148,163,184,0.2)"
                }}>{i + 1}</div>
              );
            })}
          </div>
          <button style={styles.primaryBtn} onClick={restart}>↺ Restart quiz</button>
        </div>
      </div>
    );
  }

  const progress = ((current) / questions.length) * 100;

  return (
    <div>
      <SectionHeader icon="🧠" title="Test yourself" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "#94a3b8", marginBottom: 8 }}>
        <span>Question {current + 1} of {questions.length}</span>
        <span style={{ color: "#a855f7", fontWeight: 600 }}>Score: {score}</span>
      </div>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${progress}%` }} />
      </div>
      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 14, color: "#e2e8f0", lineHeight: 1.5, marginTop: 16 }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {q.opts.map((opt, i) => {
          let extra = {};
          if (selected !== null) {
            if (i === q.ans) extra = { background: "rgba(52,211,153,0.12)", borderColor: "#34d399", color: "#34d399" };
            else if (i === selected) extra = { background: "rgba(251,113,133,0.12)", borderColor: "#fb7185", color: "#fb7185" };
          }
          return (
            <button key={i} style={{ ...styles.quizOpt, ...extra }} onClick={() => pick(i)}>
              <span style={styles.optLetter}>{String.fromCharCode(65 + i)}</span>
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
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        {current > 0 && <button style={styles.navBtn} onClick={prev}>← Prev</button>}
        <button style={styles.primaryBtn} onClick={next}>
          {current < questions.length - 1 ? "Next →" : "See results"}
        </button>
      </div>
    </div>
  );
}

// ── Helper UI components ────────────────────────
function SectionHeader({ icon, title }) {
  return (
    <div style={styles.sectionHeader}>
      <span style={styles.sectionIcon}>{icon}</span>
      <h2 style={styles.h2}>{title}</h2>
    </div>
  );
}

function SubHeader({ children }) {
  return <h3 style={styles.h3}>{children}</h3>;
}

// ══════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════

const TABS = [
  { id: "overview", label: "Overview", emoji: "⚗️", Component: OverviewSection },
  { id: "fp-concepts", label: "FP Concepts", emoji: "🧮", Component: FPConceptsSection },
  { id: "elixir-basics", label: "Elixir basics", emoji: "💜", Component: ElixirBasicsSection },
  { id: "data-types", label: "Data types", emoji: "🔷", Component: DataTypesSection },
  { id: "functions", label: "Functions", emoji: "λ", Component: FunctionsSection },
  { id: "recursion", label: "Recursion", emoji: "🔄", Component: RecursionSection },
  { id: "enums-pipes", label: "Enums & pipes", emoji: "🔗", Component: EnumsPipesSection },
  { id: "quiz", label: "Quiz", emoji: "🧠", Component: QuizSection },
];

export default function ElixirStudyGuide() {
  const [activeTab, setActiveTab] = useState("overview");
  const ActiveSection = TABS.find((t) => t.id === activeTab)?.Component ?? OverviewSection;

  return (
    <div style={styles.root}>
      {/* Header banner */}
      <div style={styles.banner}>
        <div style={styles.bannerInner}>
          <div style={styles.bannerBadge}>Functional Programming · Lecture 4</div>
          <h1 style={styles.bannerTitle}>
            <span style={styles.bannerElixir}>Elixir</span> Study Guide
          </h1>
          <p style={styles.bannerSub}>BEAM VM · Pure Functions · Immutability · Tail Recursion</p>
        </div>
      </div>

      <div style={styles.guide}>
        {/* Tab bar */}
        <div style={styles.tabBar}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              style={{ ...styles.tab, ...(activeTab === tab.id ? styles.tabActive : {}) }}
              onClick={() => setActiveTab(tab.id)}
            >
              <span style={{ marginRight: 5, fontSize: 14 }}>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={styles.content}>
          <ActiveSection />
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>By Thenul Ranmuthu</p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
//  STYLES
// ══════════════════════════════════════════════════
const styles = {
  root: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: "#e2e8f0",
    background: "#0d1117",
    minHeight: "100vh",
  },

  // Banner
  banner: {
    background: "linear-gradient(135deg, #1a0533 0%, #0d1b2e 40%, #0a1628 100%)",
    borderBottom: "1px solid rgba(168,85,247,0.3)",
    padding: "2rem 1.5rem",
    position: "relative",
    overflow: "hidden",
  },
  bannerInner: { maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 1 },
  bannerBadge: {
    display: "inline-block",
    background: "rgba(168,85,247,0.15)",
    border: "1px solid rgba(168,85,247,0.4)",
    color: "#c084fc",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "4px 12px",
    borderRadius: 20,
    marginBottom: 12,
    fontFamily: "'Courier New', monospace",
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: 800,
    margin: "0 0 8px",
    color: "#f1f5f9",
    letterSpacing: "-0.02em",
    fontFamily: "'Georgia', serif",
  },
  bannerElixir: {
    background: "linear-gradient(90deg, #a855f7, #14b8a6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  bannerSub: {
    fontSize: 13,
    color: "#64748b",
    margin: 0,
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.05em",
  },

  guide: { maxWidth: 720, margin: "0 auto", padding: "1.5rem" },

  // Tabs
  tabBar: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
    marginBottom: "1.5rem",
    borderBottom: "1px solid rgba(148,163,184,0.1)",
    paddingBottom: "1rem",
  },
  tab: {
    background: "rgba(148,163,184,0.06)",
    border: "1px solid rgba(148,163,184,0.12)",
    borderRadius: 8,
    padding: "6px 12px",
    fontSize: 12.5,
    cursor: "pointer",
    color: "#94a3b8",
    fontFamily: "'Georgia', serif",
    transition: "all 0.15s",
    display: "flex",
    alignItems: "center",
  },
  tabActive: {
    background: "rgba(168,85,247,0.15)",
    color: "#c084fc",
    borderColor: "rgba(168,85,247,0.4)",
    fontWeight: 600,
    boxShadow: "0 0 12px rgba(168,85,247,0.2)",
  },

  content: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(148,163,184,0.08)",
    borderRadius: 12,
    padding: "1.75rem",
    overflow: "hidden",
    minWidth: 0,
    boxSizing: "border-box",
  },

  // Section header
  sectionHeader: { display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: "rgba(168,85,247,0.15)",
    border: "1px solid rgba(168,85,247,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    flexShrink: 0,
  },

  // Typography
  h2: { fontSize: 20, fontWeight: 700, margin: 0, color: "#f1f5f9", fontFamily: "'Georgia', serif" },
  h3: {
    fontSize: 14,
    fontWeight: 600,
    margin: "1.4rem 0 0.6rem",
    color: "#a855f7",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    fontFamily: "'Courier New', monospace",
  },
  p: { fontSize: 14, lineHeight: 1.75, color: "#94a3b8", marginBottom: "0.75rem", fontFamily: "'Georgia', serif" },

  inlineCode: {
    background: "rgba(168,85,247,0.12)",
    border: "1px solid rgba(168,85,247,0.2)",
    color: "#c084fc",
    padding: "1px 6px",
    borderRadius: 4,
    fontSize: "0.9em",
    fontFamily: "'Courier New', monospace",
  },

  // Cards
  card: {
    background: "rgba(148,163,184,0.05)",
    border: "1px solid rgba(148,163,184,0.1)",
    borderRadius: 10,
    padding: "1rem 1.25rem",
    marginBottom: "1rem",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))",
    gap: 12,
    marginBottom: "1.25rem",
  },
  conceptCard: {
    background: "rgba(15,23,42,0.6)",
    borderRadius: 10,
    padding: "0.85rem 1rem",
    border: "1px solid rgba(148,163,184,0.08)",
  },
  conceptLabel: { fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5, fontFamily: "'Courier New', monospace" },
  conceptVal: { fontSize: 14, fontWeight: 700, color: "#e2e8f0" },
  conceptSub: { fontSize: 12, color: "#64748b", marginTop: 3 },

  // Code
  preWrapper: {
    background: "#0a0e1a",
    border: "1px solid rgba(148,163,184,0.12)",
    borderRadius: 10,
    overflow: "hidden",
    margin: "0.75rem 0 1.1rem",
  },
  preDots: {
    display: "flex",
    gap: 6,
    padding: "8px 12px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(148,163,184,0.08)",
  },
  dot: { width: 10, height: 10, borderRadius: "50%", display: "inline-block" },
  preScroll: {
    width: "100%",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  code: {
    display: "block",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    textAlign: "left",
  },
  pre: {
    background: "transparent",
    padding: "0.9rem 1rem",
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: 12.5,
    lineHeight: 1.7,
    margin: 0,
    color: "#cbd5e1",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    display: "block",
    width: "100%",
    boxSizing: "border-box",
  },

  // Highlight callout
  highlight: {
    background: "rgba(168,85,247,0.08)",
    borderLeft: "3px solid #a855f7",
    padding: "0.65rem 0.9rem",
    borderRadius: "0 8px 8px 0",
    fontSize: 13.5,
    lineHeight: 1.65,
    color: "#c4b5fd",
    margin: "0.5rem 0 1.1rem",
    fontFamily: "'Georgia', serif",
  },

  // Compare grid
  compareGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.1rem" },
  compareCard: { borderRadius: 10, padding: "0.85rem 1rem", fontSize: 13, lineHeight: 1.6 },
  compareBad: { background: "rgba(251,113,133,0.06)", border: "1px solid rgba(251,113,133,0.2)" },
  compareGood: { background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.2)" },
  compareTitle: { fontWeight: 700, fontSize: 12, marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "'Courier New', monospace" },

  // Badge
  badge: {
    display: "inline-block",
    fontSize: 11.5,
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 6,
    fontFamily: "'Courier New', monospace",
  },

  // Tree icon
  treeIcon: { width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, fontFamily: "'Courier New', monospace" },

  // Step numbers
  stepNum: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "rgba(168,85,247,0.2)",
    border: "1px solid rgba(168,85,247,0.4)",
    color: "#c084fc",
    fontSize: 11,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 2,
    fontFamily: "'Courier New', monospace",
  },

  // Progress bar
  progressBar: {
    height: 4,
    background: "rgba(148,163,184,0.12)",
    borderRadius: 2,
    marginBottom: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #a855f7, #14b8a6)",
    borderRadius: 2,
    transition: "width 0.3s ease",
  },

  // Quiz
  quizOpt: {
    background: "rgba(148,163,184,0.06)",
    border: "1px solid rgba(148,163,184,0.15)",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 13,
    cursor: "pointer",
    textAlign: "left",
    color: "#cbd5e1",
    fontFamily: "'Georgia', serif",
    transition: "all 0.15s",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  optLetter: {
    width: 22,
    height: 22,
    borderRadius: 5,
    background: "rgba(168,85,247,0.15)",
    color: "#c084fc",
    fontSize: 11,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontFamily: "'Courier New', monospace",
  },
  quizFeedback: { fontSize: 13, padding: "10px 14px", borderRadius: 8, marginBottom: "0.75rem", lineHeight: 1.6, fontFamily: "'Georgia', serif" },
  feedbackOk: { background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.25)" },
  feedbackFail: { background: "rgba(251,113,133,0.1)", color: "#fb7185", border: "1px solid rgba(251,113,133,0.25)" },

  // Buttons
  navBtn: {
    background: "rgba(148,163,184,0.08)",
    border: "1px solid rgba(148,163,184,0.2)",
    borderRadius: 8,
    padding: "8px 16px",
    fontSize: 13,
    cursor: "pointer",
    color: "#94a3b8",
    fontFamily: "'Georgia', serif",
  },
  primaryBtn: {
    background: "linear-gradient(135deg, #7c3aed, #0d9488)",
    border: "none",
    borderRadius: 8,
    padding: "9px 20px",
    fontSize: 13,
    cursor: "pointer",
    color: "#fff",
    fontWeight: 600,
    fontFamily: "'Georgia', serif",
    marginTop: 4,
  },

  // Footer
  footer: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "2rem 1.5rem 1.5rem",
    textAlign: "center",
    borderTop: "1px solid rgba(148,163,184,0.08)",
  },
  footerText: {
    fontSize: 12,
    color: "#64748b",
    margin: 0,
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.03em",
  },
};