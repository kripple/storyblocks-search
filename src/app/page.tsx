'use client';

export default function HomePage() {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const query = data.get('query');

    // TODO: Implement search functionality
    console.log('Search query:', query);
  };

  return (
    <div>
      <h1>Storyblocks Search</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoCorrect="off"
          placeholder="Search for videos, images, or audio..."
          defaultValue=""
          name="query"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
