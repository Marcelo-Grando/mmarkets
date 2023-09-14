export default function SellerForm({
  handleSubmit,
  handleInputsChange,
  seller,
}) {
  return (
    <form className="px-1" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="name"
        onChange={handleInputsChange}
        value={seller.name}
      />
      <input
        name="lastname"
        placeholder="lastname"
        onChange={handleInputsChange}
        value={seller.lastname}
      />
      <input
        name="dni"
        placeholder="dni"
        onChange={handleInputsChange}
        value={seller.dni}
      />
      <input
        name="email"
        type="email"
        placeholder="email"
        onChange={handleInputsChange}
        value={seller.email}
      />
      <input
        name="password"
        type="password"
        placeholder="password"
        onChange={handleInputsChange}
        value={seller.password}
      />
      <button>Create</button>
    </form>
  );
}
