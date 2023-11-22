import useLLM from "@/src/hooks/useLLM";

export const AddMemberInGroup = (props: any) => {
  const [llms, setLLMs, loadingLLMs] = useLLM("");

  console.log
  return (
    <>
      <header>
        <h1 className="text-center text-lg font-semibold">Add member</h1>
      </header>
      {/* <input type="search" className="w-full px-3 py-2 bg-gray-400 rounded-xl" placeholder="Search..." value={input} onChange={(e) => setInput(e.target.value)} /> */}
    </>
  );
}
