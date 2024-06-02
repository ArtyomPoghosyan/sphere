import Skeleton from 'react-loading-skeleton'
import skeletonStyle from "./skeletin.module.css"

function SkeletonLoading () {
    return (
        <div className={skeletonStyle.container}>
            <div className={skeletonStyle.skyleton_header}>
                <Skeleton width={70} height={30} />
                <Skeleton width={130} height={40} />
            </div>
            <table className={skeletonStyle.skyleton_table}>
                <div className={skeletonStyle.skyleton_talbe_container}>
                    <th><Skeleton width={100} height={20} /></th>
                    <th><Skeleton width={100} height={20} /></th>
                    <th><Skeleton width={100} height={20} /></th>
                    <th><Skeleton width={100} height={20} /></th>
                </div>

                <tr style={{ marginTop: "80px" }}> <Skeleton height={50} /></tr>
                <tr style={{ marginTop: "10px" }}> <Skeleton height={50} /></tr>
                <tr style={{ marginTop: "10px" }}> <Skeleton height={50} /></tr>
                <tr style={{ marginTop: "10px" }}> <Skeleton height={50} /></tr>
                <tr style={{ marginTop: "10px" }}> <Skeleton height={50} /></tr>
            </table>
        </div>
    )
}

export default SkeletonLoading 