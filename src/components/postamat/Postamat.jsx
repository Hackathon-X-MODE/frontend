import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {
    useGetAllPostamatesQuery,
    useLazyGetVendorByIdQuery, useLazyGetVendorsByPostamatIdQuery
} from "../../redux/postamatApi";
import { Map, ObjectManager, } from "@pbe/react-yandex-maps";
import Loader from "../loader/Loader";

import PostamatInfo from "./PostamatInfo";

const Postamat = (props) => {
    const {postamatId} = useParams()

    const {data: postamates, isFetching: postamatesFetching, isSuccess: postamatesSuccess} = useGetAllPostamatesQuery()
    const [getVendor, {data: currentPostamate, isFetching: currentPostamateFetching, isSuccess: currentPostamateSuccess}] = useLazyGetVendorByIdQuery()

    const [getPostamateByVendorId, {data: postamateById, isFetching: postamateByIDFetching, isSuccess: sc}] = useLazyGetVendorsByPostamatIdQuery()

    const [allPostamates, setAllPostamates] = useState([])
    const [postamatData, setPostamatData] = useState([])
    const [active, setActive] = useState(false)




    useEffect(() => {
        if (postamatId) {
            getPostamateByVendorId(postamatId)
            if (sc) {
                setAllPostamates(postamateById)
            }
        } else {
            if (postamatesSuccess) {
                setAllPostamates(postamates)
            }
        }
        if (currentPostamateSuccess) {
            setPostamatData({
                ...postamatData,
                ...currentPostamate
            })
        }
    },[postamatesFetching, currentPostamateFetching, sc ])


    if (!postamatesSuccess) return  <Loader />

    const res = allPostamates.map((postamate, idx) => {
        return {
            type: 'Feature',
            id: idx,
            externalId: postamate.externalId,
            postamatId: postamate.id,
            vendorId: postamate.vendorId,
            size: postamate.size,
            postamatInit: postamate.postamatInit,
            lastDateActivity: postamate.lastDateActivity,
            videoLink: postamate.videoLink,
            geometry: {
                type: 'Point',
                coordinates: [postamate.location.latitude, postamate.location.longitude ]
            }
        }
    },)

    function handlePostamate(id) {
        if (id?.vendorId !== undefined) {
            setActive(true)
            getVendor(id.vendorId)
            console.log(id)
            setPostamatData({
                externalId: id.externalId,
                postamatId: id.postamatId,
                size: id.size,
                lastDateActivity: id.lastDateActivity,
                postamatInit: id.postamatInit,
                videoLink: id.videoLink
            })
        }
    }

    return (
        <>
            <div
                className={
                    "relative"
                }
            >
                {
                    allPostamates.length !== 0 &&
                    <Map
                        modules={["clusterer.addon.balloon"]}
                        width={"100%"}
                        height={"100vh"}
                        defaultState={{
                            center: [55.751574, 37.573856],
                            zoom: 10
                        }}
                    >
                        <ObjectManager
                            onClick={(e) => {
                                const eventId = e.get('objectId')
                                handlePostamate(e.originalEvent.currentTarget.objects.getById(eventId))
                            }}
                            options={{
                                clusterize: true,
                                gridSize: 32,
                            }}
                            objects={{
                                openBalloonOnClick: true,
                                preset: 'islands#redDotIcon',
                            }}
                            clusters={{
                                preset: 'islands#redClusterIcons',
                            }}
                            defaultFeatures={{
                                type: 'FeatureCollection',
                                features: res
                            }}
                            modules={[
                                'objectManager.addon.objectsBalloon',
                                'objectManager.addon.objectsHint',
                            ]}
                            filter={object => object.id % 2 === 0}
                        />
                    </Map>

                }
                {
                    <PostamatInfo isActive={active} postamatData={postamatData} />
                }
            </div>
        </>
    );
};

export default Postamat;
