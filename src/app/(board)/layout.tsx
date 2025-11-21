import BoardHeader from '@/components/layouts/board/header';

export default function BoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <BoardHeader />
      <main className="pt-16">{children}</main>
    </div>
  );
}
