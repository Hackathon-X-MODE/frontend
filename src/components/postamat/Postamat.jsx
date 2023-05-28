import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {useGetAllPostamatesQuery, useGetPostamatesQuery, useLazyGetVendorByIdQuery} from "../../redux/postamatApi";
import { Map, ObjectManager, } from "@pbe/react-yandex-maps";
import Loader from "../loader/Loader";

import PostamatInfo from "./PostamatInfo";

const Postamat = (props) => {

    const {data: postamates, isFetching: postamatesFetching, isSuccess: postamatesSuccess} = useGetAllPostamatesQuery()
    const [getVendor, {data: currentPostamate, isFetching: currentPostamateFetching, isSuccess: currentPostamateSuccess}] = useLazyGetVendorByIdQuery()

    const [allPostamates, setAllPostamates] = useState([])
    const [postamatData, setPostamatData] = useState([])
    const [active, setActive] = useState(false)




    useEffect(() => {
        if (postamatesSuccess) {
            setAllPostamates(postamates)
        }
        if (currentPostamateSuccess) {
            setPostamatData({
                ...postamatData,
                ...currentPostamate
            })
        }
    },[postamatesFetching, currentPostamateFetching])


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

    // console.log(res)
    // // const { id } = useParams();
    // //YMAPSDATA
    // const [mapInfoDataId, setMapInfoDataId] = useState();
    // const [ymapData, setYmapData] = useState({
    //     externalId: "",
    //     location: {
    //         district: "",
    //         administrativeDistrict: "",
    //         entrance: "",
    //         address: "",
    //         latitude: "",
    //         longitude: ""
    //     },
    //     size: 0,
    //     lastDateActivity: "",
    //     videoLink: null,
    //     postamatInit: ""
    // });
    // //YMAPSDATA
    // const [isVisible, setIsVisible] = useState(false);
    // const [postamatData, setPostamatData] = useState({
    //     externalId: "",
    //     location: {
    //         district: "",
    //         administrativeDistrict: "",
    //         entrance: "",
    //         address: "",
    //         latitude: "",
    //         longitude: ""
    //     },
    //     size: 0,
    //     lastDateActivity: "",
    //     videoLink: null,
    //     postamatInit: ""
    // });
    //
    // const [getAllPostamates, {data: allPostamates,isSuccess: allPostamatesSuccess}] = useLazyGetAllPostamatesQuery()
    // const { data = [], isLoading, isSuccess: vendorPostamates } = useGetPostamatesQuery();
    // const [addPostamate, { isError }] = useAddPostamatesMutation();
    // const [updatePostamates, { isError: isErrorUpdate }] = useUpdatePostamatesMutation();
    //
    // useEffect(() => {
    //     // GET ALL POSTAMATES
    //     if (props.id) {
    //
    //     } else {
    //         getAllPostamates()
    //         if (allPostamatesSuccess) {
    //             console.log(allPostamates)
    //         }
    //     }
    // }, [allPostamatesSuccess, props.id])
    //
    // const updateInput = (e) => {
    //     const { name, value } = e.target;
    //     setPostamatData((prevState) => {
    //         const newState = { ...prevState };
    //         if (
    //             name === "district" ||
    //             name === "administrativeDistrict" ||
    //             name === "entrance" ||
    //             name === "address" ||
    //             name === "latitude" ||
    //             name === "longitude"
    //         ) {
    //             newState.location[name] = value;
    //         } else {
    //             if (name === "lastDateActivity") {
    //                 newState[name] = value;
    //             } else {
    //                 newState[name] = e.target.value;
    //             }
    //         }
    //         return newState;
    //     });
    // };
    //
    // const handleForm = async (e) => {
    //     e.preventDefault();
    //     postamatData.lastDateActivity = new Date(
    //         postamatData.lastDateActivity
    //     ).toISOString();
    //     try {
    //         // await addPostamate({ body: { ...postamatData }, id: id });
    //         // setIsVisible(!isVisible);
    //         // setPostamatData({
    //         //     externalId: "",
    //         //     location: {
    //         //         district: "",
    //         //         administrativeDistrict: "",
    //         //         entrance: "",
    //         //         address: "",
    //         //         latitude: "",
    //         //         longitude: ""
    //         //     },
    //         //     size: 0,
    //         //     lastDateActivity: "",
    //         //     videoLink: null,
    //         //     postamatInit: ""
    //         // });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };
    //
    // // UPDATE FORM
    // const handleUpdateInput = (e) => {
    //     const { name, value } = e.target;
    //     console.log(ymapData);
    //     setYmapData((prevState) => {
    //         const newState = { ...prevState };
    //         if (
    //             name === "district" ||
    //             name === "administrativeDistrict" ||
    //             name === "entrance" ||
    //             name === "address" ||
    //             name === "latitude" ||
    //             name === "longitude"
    //         ) {
    //             // newState.location[name] = value
    //         } else {
    //             if (name === "lastDateActivity") {
    //                 newState[name] = value;
    //             } else {
    //                 newState[name] = e.target.value;
    //             }
    //         }
    //         return newState;
    //     });
    // };
    //
    // const handleUpdateForm = async (e) => {
    //     e.preventDefault();
    //     ymapData.lastDateActivity = new Date(
    //         ymapData.lastDateActivity
    //     ).toISOString();
    //     try {
    //         // await updatePostamates({
    //         //     body: { ...ymapData },
    //         //     vendorId: id,
    //         //     postamatId: ymapData.id
    //         // });
    //         // setIsVisible(!isVisible)
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };
    // const postamatCrop = data.filter((item) => {
    //     if (item.id === mapInfoDataId) {
    //         // setYmapData(item)
    //     }
    //     return item.id === mapInfoDataId;
    // });
    //
    // if (isLoading) return <div>Loading..</div>;
    // if (isErrorUpdate) return <div>ERROR</div>;

    // const data = {
    //     type: 'FeatureCollection',
    //     features:
    // }


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
            )}
        </>
    );
};

export default Postamat;
