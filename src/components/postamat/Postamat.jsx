import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useGetAllPostamatesQuery, useGetVendorsQuery,} from "../../redux/postamatApi";
import {Clusterer, Map, Placemark,} from "@pbe/react-yandex-maps";
import Loader from "../loader/Loader";

import PostamatInfo from "./PostamatInfo";
import PostamatFilter from "./PostamatFilter";
import qs from "query-string";

const Postamat = (props) => {
    const params = qs.parse(props.location.search, {ignoreQueryPrefix: true})


    const [allPostamates, setAllPostamates] = useState([])
    const [vendorsFilter, setVendorsFilter] = useState()
    const [postamatData, setPostamatData] = useState([])
    const [active, setActive] = useState(false)
    const [postamatFilter, setPostamatFilter] = useState({
        vendors: [params.vendor].filter(i => i !== undefined),
        postamatId: params.postamate ?? '',
        address: '',
        sizeAt: '',
        sizeTo: ''
    })


    const {
        data: postamates,
        isFetching: postamatesFetching,
        isSuccess: postamatesSuccess
    } = useGetAllPostamatesQuery({
        postamatId: postamatFilter.postamatId,
        vendors: postamatFilter.vendors,
        address: postamatFilter.address,
        sizeAt: postamatFilter.sizeAt,
        sizeTo: postamatFilter.sizeTo
    })
    const {data: vendorsData, isFetching: vendorsFetching, isSuccess: vendorsSuccess} = useGetVendorsQuery()


    useEffect(() => {

        if (postamatesSuccess) {
            setAllPostamates(postamates)
        }
        if (vendorsSuccess) {
            const vendorsArray = [...vendorsData]
            const mappedVendors = vendorsArray.map((v) => {
                return {
                    ...v,
                    checked: false
                }
            })
            setVendorsFilter(mappedVendors)
        }
    }, [postamatesFetching, vendorsFetching, postamatFilter.vendors.length, postamatFilter.sizeTo, postamatFilter.sizeAt, postamatFilter.address])

    const handleFilter = (e, id) => {
        console.log("UP", id)
        const vendorsArray = [...vendorsFilter]
        const vendorsIndex = vendorsArray.findIndex((i) => i.id === id)
        vendorsArray[vendorsIndex].checked = !vendorsArray[vendorsIndex].checked
        setVendorsFilter(vendorsArray)
        let selectedVendors = new Set(postamatFilter.vendors);
        if (!selectedVendors.has(id)) {
            selectedVendors.add(id)
        } else {
            selectedVendors.delete(id)
        }
        console.log("T", selectedVendors)

        setPostamatFilter({
            ...postamatFilter,
            vendors: [...selectedVendors]
        })
    }


    if (postamatesFetching) return <Loader/>

    console.log('123', postamatFilter)
    const res = Array.isArray(allPostamates) ? allPostamates.map((postamate, idx) => {
        // console.log(allPostamates)
        return {
            type: 'Feature',
            id: idx,
            externalId: postamate?.externalId,
            postamatId: postamate?.id,
            vendorId: postamate?.vendorId,
            size: postamate?.size,
            postamatInit: postamate?.postamatInit,
            lastDateActivity: postamate?.lastDateActivity,
            videoLink: postamate?.videoLink,
            geometry: {
                type: 'Point',
                coordinates: [postamate?.location?.latitude, postamate?.location?.longitude]
            }
        }
    },) : [allPostamates].map((postamate, idx) => {
        return {
            type: 'Feature',
            id: idx,
            externalId: postamate?.externalId,
            postamatId: postamate?.id,
            vendorId: postamate?.vendorId,
            size: postamate?.size,
            postamatInit: postamate?.postamatInit,
            lastDateActivity: postamate?.lastDateActivity,
            videoLink: postamate?.videoLink,
            geometry: {
                type: 'Point',
                coordinates: [postamate?.location?.latitude, postamate?.location?.longitude]
            }
        }
    },)

    function handlePostamate(id) {
        if (id?.vendorId !== undefined) {
            setActive(true)
            setPostamatFilter({
                ...postamatFilter,
                vendors: [postamatFilter.vendors.join(','), id.vendorId]
            })
            console.log('123')
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
                <PostamatFilter postamatFilter={postamatFilter} vendors={vendorsData} handleFilter={handleFilter}/>
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
                        <Clusterer
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
                            modules={[
                                'objectManager.addon.objectsBalloon',
                                'objectManager.addon.objectsHint',
                            ]}
                            filter={object => object.id % 2 === 0}
                        >
                            {res.map((r, index) => (
                                <Placemark
                                    key={index}
                                    geometry={r.geometry}
                                    properties={{
                                        source: r
                                    }}
                                    // options={
                                    //     {
                                    //         preset: 'islands#icon',
                                    //         iconColor: '#b60000'
                                    //     }
                                    // }
                                    onClick={(e) => {
                                        handlePostamate(e.originalEvent.target.properties._data.source)
                                    }}
                                />
                            ))}
                        </Clusterer>
                    </Map>

                }
                {
                    <PostamatInfo isActive={active} postamatData={postamatData}/>
                }
            </div>
        </>
    );
};

export default Postamat;
