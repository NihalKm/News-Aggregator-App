import { Skeleton, Stack, Typography } from "@mui/material"
import React from "react"

interface NewsCardProps {
    title: string;
    subtitle: string;
    imageUrl: string | null;
    author: string | null;
    url: string | null;
}

const NewsCardSkeleton: React.FC = () => {
    return(
        <Skeleton variant="rounded" sx={{background:"linear-gradient(to right, #7c7a7a 0%, #bbbbbb 51%, #918a8a 72%)", boxShadow:"0px 1px 2px 2px #778899", minWidth:{xs:"100%", md:"calc(50% - 4px)"}, maxWidth:{xs:"100%", md:"calc(50% - 4px)"}, flex:1}} height={150} />
    )
}

const NewsCard: React.FC<NewsCardProps> = (props) => {
    const { title, subtitle, imageUrl, author, url } = props;
    return(
        <Stack component="a" href={url} target="_blank" rel="noopener noreferrer" flexDirection="row" sx={{textDecoration:"none", background:"white", boxShadow:"0px 1px 2px 2px #778899", borderRadius:"4px", minWidth:{sm:"100%", md:"calc(50% - 4px)"}, maxWidth:{xs:"100%",sm:"100%", md:"calc(50% - 4px)"}, flex:1, height:"150px"}}>
            <img 
                src={imageUrl}
                alt={author}
                style={{ flex:1, height: "calc(100% - 8px)", margin:"4px", borderRadius: '4px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
            />
            <Stack sx={{ flex: 2,  minHeight: "100px",  width: "100%",  overflow: "hidden" }}>
                <Typography variant="h6" component="div" sx={{ padding:"2px", lineHeight:"1.2", color:"#5a3d3d", flexGrow: 1, fontSize: { xs:"0.75rem", md:"0.8rem", lg:"1rem"}, fontWeight: { xs:"bold" }, overflow: "hidden", textOverflow: "ellipsis"}}>
                    {title}
                </Typography>
                <Typography variant="h6" component="div" sx={{ padding:"2px", lineHeight:"1.2", color:"#5a3d3d", flexGrow: 1, fontSize: { xs:"0.75rem", md:"0.8rem", lg:"1rem"}, fontWeight: { xs:"100" }, overflow: "hidden", textOverflow: "ellipsis"}}>
                    {subtitle}
                </Typography>
            </Stack>
        </Stack>
    )
}

export { NewsCardSkeleton, NewsCard }