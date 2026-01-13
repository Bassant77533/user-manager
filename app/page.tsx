import StepCircle from "./components/atoms/StepCircle";

export default function Home() {
  return (
    <main>
      <StepCircle
        content={1}
        title="default"
        isCompleted={false}
      />
  </main>
  );
}
