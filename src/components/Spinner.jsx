export function Spinner() {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-transparent z-50 flex justify-center items-center">
      <div className="animate-spin w-20 h-20 border-8 border-x-base border-y-secondary rounded-full transparent"></div>
    </div>
  );
}
