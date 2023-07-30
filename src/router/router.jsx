import React from 'react'
import Login from '../pages/Login/Login'
import { Route, Routes } from 'react-router-dom'
import { Payment } from '../pages/Payment/Payment'
import { NotFound } from '../pages/NotFound/NotFound'
import { AuthMiddleware } from '../middlewares/AuthMiddleware'
import { Successful } from '../pages/Successful/Successful'
import { MainLayout } from '../components/sections/MainLayout'
import { PackageList } from '../pages/PackageList/PackageList'

export default function router() {
    return (
        <Routes>
            <Route element={<AuthMiddleware />}>
                <Route path='/' element={<Login />}></Route>
                <Route element={<MainLayout />}>
                    <Route path='package-list' element={<PackageList />} />
                    <Route path='payment'>
                        <Route index element={<Payment />} />
                    </Route>
                    <Route path='successful' element={<Successful />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
