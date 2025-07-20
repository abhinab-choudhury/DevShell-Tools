import { Outlet } from 'react-router-dom';

export default function BaseLayout() {
  return (
    <div>
      Base Layout
      <Outlet />
    </div>
  );
}
