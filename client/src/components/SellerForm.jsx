import Form from "./Form";

export default function SellerForm({
  handleSubmit,
  handleInputsChange,
  seller,
}) {
  return (
    <Form
      handleInputsChange={handleInputsChange}
      handleSubmit={handleSubmit}
      value={seller}
      title={"create seller"}
      btnText={"create seller"}
    />
    // <div className="p-2">
    //   <div className="abs-center text-center">
    //     <form className="border p-3 form" onSubmit={handleSubmit}>
    //       <h4 className="aling-middle p-2">Create Seller</h4>
    //       <div className="form-group p-1">
    //         <input
    //           autoFocus
    //           className="form-control"
    //           name="name"
    //           placeholder="name"
    //           onChange={handleInputsChange}
    //           value={seller.name}
    //         />
    //       </div>
    //       <div className="form-group p-1">
    //         <input
    //         className="form-control"
    //           name="lastname"
    //           placeholder="lastname"
    //           onChange={handleInputsChange}
    //           value={seller.lastname}
    //         />
    //       </div>
    //       <div className="form-group p-1">
    //         <input
    //           className="form-control"
    //           name="dni"
    //           placeholder="dni"
    //           onChange={handleInputsChange}
    //           value={seller.dni}
    //         />
    //       </div>
    //       <div className="form-group p-1">
    //         <input
    //           className="form-control"
    //           name="email"
    //           type="email"
    //           placeholder="email"
    //           onChange={handleInputsChange}
    //           value={seller.email}
    //         />
    //       </div>
    //       <div className="form-group p-1">
    //         <input
    //           className="form-control"
    //           name="password"
    //           type="password"
    //           placeholder="password"
    //           onChange={handleInputsChange}
    //           value={seller.password}
    //         />
    //       </div>
    //       <div className="form-group m-1">
    //           <button className="btn bg-info w-100">Create</button>
    //         </div>
    //     </form>
    //   </div>
    // </div>
  );
}
