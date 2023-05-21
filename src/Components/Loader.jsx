import { Spinner } from "reactstrap"

const Loader = () => {
    return <Spinner
    data-testid="loader"
    type="border"
    style={{ height: "5rem", width: "5rem" }}
    color="primary"
  />
}

export default Loader