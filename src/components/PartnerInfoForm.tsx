import React, { useState } from 'react'

interface PartnerInfo {
  name: string
  email: string
  website: string
}

interface Props {
  onSubmit: (info: PartnerInfo) => void
}

const PartnerInfoForm: React.FC<Props> = ({ onSubmit }) => {
  const [info, setInfo] = useState<PartnerInfo>({ name: '', email: '', website: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(info)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Partner Information</h2>
      {/* Add input fields for name, email, and website */}
      <button type="submit">Submit</button>
    </form>
  )
}

export default PartnerInfoForm