import React, { useState } from 'react';
import {useParams} from "react-router-dom";
import {useAddPostamatesMutation, useGetPostamatesQuery, useUpdatePostamatesMutation} from "../../redux/postamatApi";
import Input from "../form/Input";
import {Map, Placemark} from "@pbe/react-yandex-maps";

const Postamat = (props) => {
    const {id} = useParams()
    //YMAPSDATA
    const [mapInfoDataId, setMapInfoDataId] = useState()
    const [ymapData, setYmapData] = useState({
        externalId: '',
        location: {
            district: '',
            administrativeDistrict: '',
            entrance: '',
            address: '',
            latitude: '',
            longitude: ''
        },
        size: 0,
        lastDateActivity: '',
        videoLink: null,
        postamatInit: ''
    })
    //YMAPSDATA
    const [isVisible, setIsVisible] = useState(false)
    const [postamatData, setPostamatData] = useState({
        externalId: '',
        location: {
            district: '',
            administrativeDistrict: '',
            entrance: '',
            address: '',
            latitude: '',
            longitude: ''
        },
        size: 0,
        lastDateActivity: '',
        videoLink: null,
        postamatInit: ''
    })

    const {data = [], isLoading} = useGetPostamatesQuery(id)
    const [addPostamate, {isError}] = useAddPostamatesMutation()
    const [updatePostamates, {isError: isErrorUpdate}] = useUpdatePostamatesMutation()

    const updateInput = (e) => {
        const {name, value } = e.target
        setPostamatData((prevState) => {
            const newState = {...prevState}
            if (name === 'district' || name === 'administrativeDistrict' || name === 'entrance' || name === 'address' || name === 'latitude' || name === 'longitude') {
                newState.location[name] = value
            } else {
                if (name === 'lastDateActivity') {
                    newState[name] = value
                } else {
                    newState[name] = e.target.value
                }
            }
            return newState
        })
    }

    const handleForm = async (e) => {
        e.preventDefault()
        postamatData.lastDateActivity = new Date(postamatData.lastDateActivity).toISOString()
        try {
            await addPostamate({body: {...postamatData}, id:id})
            setIsVisible(!isVisible)
            setPostamatData({
                externalId: '',
                location: {
                    district: '',
                    administrativeDistrict: '',
                    entrance: '',
                    address: '',
                    latitude: '',
                    longitude: ''
                },
                size: 0,
                lastDateActivity: '',
                videoLink: null,
                postamatInit: ''
            })
        } catch (e) {
            console.log(e)
        }

    }

    // UPDATE FORM
    const handleUpdateInput = (e) => {
        const {name, value} = e.target
        console.log(ymapData)
        setYmapData((prevState) => {
            const newState = {...prevState}
            if (name === 'district' || name === 'administrativeDistrict' || name === 'entrance' || name === 'address' || name === 'latitude' || name === 'longitude') {
                // newState.location[name] = value

            } else {
                if (name === 'lastDateActivity') {
                    newState[name] = value
                } else {
                    newState[name] = e.target.value
                }
            }
            return newState
        })
    }

    const handleUpdateForm = async (e) => {
        e.preventDefault()
        ymapData.lastDateActivity = new Date(ymapData.lastDateActivity).toISOString()
        try {
            await updatePostamates({body: {...ymapData}, vendorId: id, postamatId: ymapData.id})
            // setIsVisible(!isVisible)
        } catch (e) {
            console.log(e)
        }

    }
    const postamatCrop = data.filter((item) => {
        if (item.id === mapInfoDataId) {
            // setYmapData(item)
        }
        return(
            item.id === mapInfoDataId
        )
    })

    if (isLoading) return <div>Loading..</div>
    if (isErrorUpdate) return <div>ERROR</div>




    return(
        <>
            {
                isError && <div>Error</div>
            }
            <div className={'h-72 w-5/6 flex flex-col bg-white p-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-100%] overflow-y-scroll rounded'}>
                {/*<Link to={`${location.pathname}/create`}>Ujnjdf</Link>*/}
                <button onClick={() => setIsVisible(!isVisible)} className={'bg-primary rounded p-2 text-white'}>Добавить постамат</button>
                {
                    data &&
                    <ul className={'flex flex-col gap-1'}>
                        <Map width={'100%'} defaultState={{ center: [55.751574, 37.573856], zoom: 10 }} >

                        {
                            data.map((postamat) => {
                                return(
                                            <Placemark key={postamat.id} onClick={() =>{
                                                setMapInfoDataId(postamat.id);
                                                setYmapData(...data.filter(item => item.id === postamat.id))
                                            }}
                                                       defaultGeometry={[postamat.location.latitude, postamat.location.longitude]}
                                            />
                                )
                            })
                        }
                        </Map>
                    </ul>
                }
            </div>

            {/*// FORM INTO POSTAMAT CREATE! */}
            <form
                onSubmit={handleForm}
                className={`w-5/6 overflow-y-scroll shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)] p-2 bg-secondary text-white ${isVisible ? 'visible' : 'invisible'} absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[200%] rounded`}
            >
                <h1 className={'text-2xl text-center'}>Форма добавления Постамата</h1>
                <div className={'flex flex-wrap gap-2'}>
                    <div>
                        <label>Номер постамата</label>
                        <Input type={'number'} name={'externalId'} contentValue={postamatData.externalId} updateFunc={updateInput} isRequired={true} />
                    </div>
                    <div>
                        <label>Район</label>
                        <Input name={"district"} contentValue={postamatData.location.district} updateFunc={updateInput} isRequired={true} />

                    </div>
                    <div>
                        <label>Административный округ</label>
                        <Input name={"administrativeDistrict"} contentValue={postamatData.location.administrativeDistrict} updateFunc={updateInput} isRequired={true} />

                    </div>
                    <div>
                        <label>Подъезд</label>
                        <Input name={"entrance"} contentValue={postamatData.location.entrance} updateFunc={updateInput} isRequired={true} />

                    </div>
                    <div>
                        <label>Адрес</label>
                        <Input name={"address"} contentValue={postamatData.location.address} updateFunc={updateInput} isRequired={true} />

                    </div>
                    <div>
                        <label>Широта</label>
                        <Input type={'number'} name={"latitude"} contentValue={postamatData.location.latitude} updateFunc={updateInput} isRequired={true} />

                    </div>
                    <div>
                        <label>Долгота</label>
                        <Input type={'number'} name={"longitude"} contentValue={postamatData.location.longitude} updateFunc={updateInput} isRequired={true} />


                    </div>
                    <div>
                        <label>Размер</label>
                        <Input type={'number'} name={"size"} contentValue={postamatData.size} updateFunc={updateInput} isRequired={true} />

                    </div>
                    <div>
                        <label>Последняя активность</label>
                        <Input name={"lastDateActivity"} type={'date'}  contentValue={postamatData.lastDateActivity} updateFunc={updateInput} isRequired={true} />

                    </div>
                    <div>
                        <label>Ссылка на видео-ресурс</label>
                        <Input type={'url'} name={"videoLink"} contentValue={postamatData.location.videoLink} updateFunc={updateInput} isRequired={true} />

                    </div>
                    <div>
                        <label>Дата установки постамата</label>
                        <Input name={"postamatInit"} type={'date'} contentValue={postamatData.location.postamatInit} updateFunc={updateInput} isRequired={true} />
                    </div>
                </div>
                <button className={'p-3 w-full bg-primary font-bold text-white my-2 rounded hover:bg-black transition duration-700 ease-in-out'}>Создать</button>

            </form>

            {
                postamatCrop.length !== 0 &&
                <form onSubmit={handleUpdateForm} className={`flex flex-wrap gap-2 w-1/2 h-fit  overflow-y-scroll shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)] p-2 bg-secondary text-white absolute left-[25%]   bottom-[50px]   rounded`}>
                    <div>
                        <label>Номер Постамата</label>
                        <Input name={'externalId'} type={'number'} isRequired={true} updateFunc={handleUpdateInput}  contentValue={ymapData?.externalId}  />
                    </div>
                    <div>
                        <label>Размер</label>
                        <Input name={'size'} type={'number'} isRequired={true} updateFunc={handleUpdateInput} contentValue={ymapData?.size}  />

                    </div>
                    <div>
                        <label>Район</label>
                        <Input name={'district'} type={'text'} isRequired={true} updateFunc={handleUpdateInput} contentValue={ymapData?.location.district}  />

                    </div>
                    <div>
                        <label>Административный округ</label>
                        <Input name={'administrativeDistrict'} type={'text'} isRequired={true} updateFunc={handleUpdateInput} contentValue={ymapData?.location.administrativeDistrict}  />

                    </div>
                    <div>
                        <label>Подъзд</label>
                        <Input name={'entrance'} type={'text'} isRequired={true} updateFunc={handleUpdateInput} contentValue={ymapData?.location.entrance}  />

                    </div>
                    <div>
                        <label>Адрес</label>
                        <Input name={'adress'} type={'text'} isRequired={true} updateFunc={handleUpdateInput} contentValue={ymapData?.location.address}  />

                    </div>
                    <div>
                        <label>Последняя активность</label>
                        <Input name={'lastDateActivity'} type={'date'} isRequired={true} updateFunc={handleUpdateInput} contentValue={ymapData?.lastDateActivity}  />

                    </div>
                    <div>
                        <label>Видео-ресурс</label>
                        <Input name={'videoLink'} type={'url'} isRequired={true} updateFunc={handleUpdateInput} contentValue={ymapData?.videoLink}  />

                    </div>
                    <div>
                        <label>Дата установки постамата</label>
                        <Input name={'postamatInit'} type={'date'} isRequired={true} updateFunc={handleUpdateInput} contentValue={ymapData?.postamatInit}  />
                    </div>
                    <button className={'p-3 w-full bg-primary font-bold text-white my-2 rounded hover:bg-black transition duration-700 ease-in-out'}>Обновить</button>
                </form>
            }
        </>
    )
}

export default Postamat;