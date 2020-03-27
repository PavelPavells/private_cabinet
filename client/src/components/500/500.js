import React from "react";
import { Link } from "react-router-dom";
import "./500.scss";
const intervalServerError = props => {
    return (
        <div className="interval-server-error">
            <Link>
                <b>500</b>
            </Link>
            <p>Ошибка на стороне сервера</p>
            <p>
                Либо вы указали неверный URL, у вас нет доступа
                привилегии для страницы, или страница, которую вы ищете, была
                удален.
            </p> 
        </div>
    )
}
export default intervalServerError;