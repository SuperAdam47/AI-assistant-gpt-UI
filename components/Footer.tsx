export default function Footer() {
  return (
    <footer className="text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex justify-center items-center px-3 sm:mb-0 mb-3">
      <div>
        Powered by{' '}
        <a
          href="https://huggingface.co/meta-llama/Llama-2-70b-chat-hf"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          Mixtral MOE{' '}
        </a>
        and{' '}
        <a
          href="https://together.ai"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          Together.ai
        </a>
      </div>
    </footer>
  );
}
