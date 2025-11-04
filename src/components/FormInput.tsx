interface Props {
  label: string
  type?: string
  name: string
  value?: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  textarea?: boolean
  required?: boolean
}

export default function FormInput({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  textarea = false,
  required,
}: Props) {
  return (
    <div className="form-control w-full mb-4">
      <label className="label">
        <span className="label-text font-semibold">{label}</span>
      </label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="textarea textarea-bordered h-32"
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="input input-bordered w-full"
        />
      )}
    </div>
  )
}
