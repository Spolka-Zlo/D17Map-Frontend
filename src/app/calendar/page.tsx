export default function Reservation() {
  return (
    <main>
      {Array.from({ length: 100 }, (_, i) => (
        <div key={i} className="flex justify-between items-center border-b">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          necessitatibus voluptate saepe, soluta distinctio iste fugiat impedit
          delectus debitis quia architecto perferendis excepturi, quibusdam
          animi consectetur vitae officiis iusto odit.
        </div>
      ))}
    </main>
  );
}
