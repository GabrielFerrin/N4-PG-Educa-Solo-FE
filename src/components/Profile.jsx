import { useEffect, useContext, useState } from 'react';
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import './Profile.css';
const saveProfileData = async (profile) => {
  // Aquí debes implementar la lógica para guardar los datos en tu API o base de datos
  console.log('Datos guardados:', profile);
};

function Profile() {
  const { user, setUser, verifyTokenReq } = useContext(DataContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    nombre: '',
    apellido: '',
    email: '',
    rol: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      // Establece los datos iniciales del perfil si hay datos de usuario
      setProfile({
        nombre: user.name || '',
        apellido: user.surname || '',
        email: user.email || '',
        rol: user.role || ''
      });
    } else {
      verifyTokenMut.mutate();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await saveProfileData(profile);
      // Si la API de guardado es exitosa, podrías actualizar el contexto del usuario
      setUser({
        ...user,
        name: profile.nombre,
        surname: profile.apellido,
        email: profile.email,
        role: profile.rol
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar los datos del perfil:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Si se desea, puedes recargar los datos originales aquí
    setProfile({
      nombre: user.name || '',
      apellido: user.surname || '',
      email: user.email || '',
      rol: user.role || ''
    });
  };

  const verifyTokenMut = useMutation(verifyTokenReq, {
    onSuccess: (user) => {
      if (!user.success) {
        navigate('/login');
      }
    },
    onError: (error) => {
      console.log('There was an error', error);
    }
  });

  return (
    <div className='profile-cmp'>
      <div className='nav-profile-cmp'>
        <h1>Mi Perfil</h1>
      </div>
      <div className='menu-profile-cmp'>
        <div className='photo-profile-cmp'>
          <img src="../profile-pic.jpg" alt="Profile" />
        </div>
        <div className='datos-profile-cmp'>
          {isEditing ? (
            <div className='info-profile-cmp-edit'>
              <div>
                <label>Nombre: </label>
                <input
                  type='text'
                  name='nombre'
                  value={profile.nombre}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Apellido: </label>
                <input
                  type='text'
                  name='apellido'
                  value={profile.apellido}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type='email'
                  name='email'
                  value={profile.email}
                  onChange={handleChange}
                />
              </div>

            </div>
          ) : (
            <div className='info-profile-box-cmp'>

              <div className='info-profile-cmp'>
                <div className='info-container-cmp'>
                  <h3>Nombre</h3>
                  <h2>{profile.nombre}</h2>
                </div>
                <div className='info-container-cmp'>
                  <h3>Apellido</h3>
                  <h2>{profile.apellido}</h2>
                </div>
                <div className='info-container-cmp'>
                  <h3>Email </h3>
                  <h2>{profile.email}</h2>
                </div>
              </div>

              <div className='info-profile-cmp'>
                <div className='info-container-cmp-rol'>
                  <h3>Rol</h3>
                  <h2 className='rol'>{profile.rol}</h2>
                </div>
                <div className='info-logo-profile'>
                  <img src="../student-icon.svg" alt="" />
                </div>
              </div>
            </div>
          )}
          <div className='editar-modal'>
            {isEditing ? (
              <>
                <button onClick={handleSave}>Guardar</button>
                <button onClick={handleCancel}>Cancelar</button>
              </>
            ) : (
              <button onClick={handleEdit}>Editar</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;