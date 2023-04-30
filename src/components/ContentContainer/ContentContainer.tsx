import React, { FC, PropsWithChildren } from 'react'
import { createUseStyles } from 'react-jss';

const ContentContainer: FC<PropsWithChildren> = ({ children }) => {
    const style = useStyles()
    return (
        <div className={style.contentContainer}>{children}</div>
    )
}

export default ContentContainer

const useStyles = createUseStyles((theme) => {
    return ({
        contentContainer: {
            width: '100%',
            "& > *": {
                maxWidth: '1080px',
                margin: `0 auto`,
            }
        }
    })
});
