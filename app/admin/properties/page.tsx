import { redirect } from 'next/navigation';

export default function AdminPropertiesRedirect() {
  redirect('/admin?tab=properties');
}
