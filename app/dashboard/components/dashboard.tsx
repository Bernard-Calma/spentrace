"use client";
export default function Dashboard({ user }: { user: AppUser }) {
  console.log("Dashboard user prop:", user);
  return (
    <div>
      Dashboard {user?.username} ({user?.email})
    </div>
  );
}
