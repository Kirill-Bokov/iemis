import React from "react";
import { ViewDispatcher } from "./ViewDispatcher";

const DisplayPanel: React.FC = () => {
    return <div>
        <ViewDispatcher entity="staff" operation="view" />
    </div>
}

export default DisplayPanel