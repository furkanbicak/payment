import React, { useEffect, useState }   from "react";
import { Card }                         from "antd";
import { useDispatch, useSelector }     from "react-redux";
import NotImage                         from "../../../assets/noImage.svg"
import { togglePackage }                from "../../../store/slices/packagesSlice";

export const Package = ({ data }) => {
    const dispatch = useDispatch();
    const [selectedStyle, setSelectedStyle] = useState(false);

    const selectedItem = (selectedId, selectedAmount) => {
        setSelectedStyle(!selectedStyle);
        dispatch(togglePackage({ selectedId, selectedAmount }));
    };
    const {selectedPackage} = useSelector((store) => store.packages)

    useEffect(() => {
        let findPackage = selectedPackage.find(e => e === data.id)
        setSelectedStyle(findPackage)
    }, [])

  return (
    <Card hoverable onClick={() => selectedItem(data.id, data.amount)}>
        <div className={`container ${selectedStyle ? "selected" : ""}`}>
            <div className="container_image">
                { data.image ? 
                    <img src={data.imagePath} alt="resim" /> 
                    :
                    <img src={NotImage} alt="Logo" />
                }
            </div>
            <div className="container_context">
                <div className="container_context_title">
                    <div className="container_context_title_name">{ data.name }</div>
                    <div className="container_context_title_price">{ data.amount } { data.currency }</div>
                </div>
                <div className="container_context_detail">
                    { data.details.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
                <hr />
                <div className="container_context_ticket">
                    {data.tags.map((item, index) => (
                        <p key={index} className="container_context_ticket_badge">{item}</p>
                    ))}
                </div>
            </div>
        </div>
    </Card>
  )
}
