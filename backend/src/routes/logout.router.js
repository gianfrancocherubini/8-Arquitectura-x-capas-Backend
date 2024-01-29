import { Router } from 'express';

export const router=Router()

router.get('/', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.status(500).redirect('/api/login?error=fallo en el logout');
            return;
        }

        res.redirect('/api/login');
    });
});

router.get('*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({error: "Page not found"});
});