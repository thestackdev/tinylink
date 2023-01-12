import Form from 'components/Form'

export default function DashboardLayout({ children }) {
  return (
    <div>
      {children}
      <Form />
    </div>
  )
}
