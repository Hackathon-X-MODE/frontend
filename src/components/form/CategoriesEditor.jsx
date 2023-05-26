import Selector from "./Selector";
import SelectorMulty from "./SelectorMulty";

const map = {
    "PRODUCT_DESCRIPTION": [],
    "PREPARE_ORDER": [
        "SELECT_POSTAMAT",
        "SEARCH_POSTAMAT_AT_HOUSE"
    ],
    "GETTING_ORDER": [
        "PAY_ORDER",
        "OPEN_POSTAMAT"
    ],
    "GOT_ORDER": [
        "PACKING",
        "COMPLETENESS"
    ],
    "PRODUCT": [
        "QUALITY",
        "DESCRIPTION"
    ],
    "POST_BOX": [
        "WORK_POSTAMAT",
        "LOCATION_POSTAMAT",
        "VIEW_POSTAMAT"
    ],
    "DELIVERY": [
        "DEADLINE",
        "COAST_DELIVERY",
        "DELIVERY_GUY_REPORT"
    ],
    "NOTIFICATION": [
        "CONFIRM_NOTIFICATION",
        "DELIVERY_NOTIFICATION",
        "READY_NOTIFICATION"
    ],
    "OTHER": []
}
const CategoriesEditor = ({comment, category, subCategory}) => {

    const commentTypes = comment.commentTypes

    const existedCategories = commentTypes.map(v => v.name);
    return (
        <>
            {
                <div className={'flex mt-[30px]'}>
                    <div className={'w-5/12 flex flex-col '}>
                        {
                            commentTypes.map((commentType, idx) => {
                                return (
                                    <Selector key={`${commentType}-${idx}`}
                                              existedCategories={existedCategories}
                                              selected={commentType.name} callable={category}/>
                                )
                            })
                        }
                    </div>
                    <div className={'w-7/12 flex flex-col'}>
                        {
                            commentTypes
                                .map((commentType, idx) => {

                                    if (map[commentType.name].length > 0) {

                                        return (
                                            <SelectorMulty key={`${commentType}-sup-${idx}`} all={map[commentType.name]}
                                                           selected={commentType.value} callable={e => {
                                                subCategory(commentType.name, e)
                                            }}/>
                                        )
                                    } else {
                                        return (
                                            <div>Отсутвует</div>
                                        )
                                    }
                                })
                        }
                    </div>
                </div>
            }
        </>
    )

}

export default CategoriesEditor;