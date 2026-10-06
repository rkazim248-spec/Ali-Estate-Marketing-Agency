import { redirect } from 'next/navigation';

export default function AdminNewPropertyRedirect() {
  redirect('/admin?tab=properties&action=new');
}
