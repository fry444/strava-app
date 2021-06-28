import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Paper, Divider } from '@material-ui/core';
import { addActivityAction } from "../../actions/activityActions";

const useStyles = makeStyles((theme) => ({
  gridList: {
    flexWrap: 'wrap',
    transform: 'translateZ(0)',
    height: "168px"
  },
  media: {
    objectFit: "cover",
    height: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectedCategories: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0),
    margin: 0,
    marginBottom: 16
  },
  chip: {
    margin: theme.spacing(0),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  container: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2),
    padding: 24
  },
  img: {
    backgroundColor: "lightgrey",
    width: 168,
    height: 168,
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }
}));

const NewActivity = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [type, updateType] = useState("");
  const [username, updateUsername] = useState("");
  const [title, updateTitle] = useState("");
  const [url, updateUrl] = useState("");
  const [comment, updateComment] = useState("");
  const [text, updateText] = useState("");
  const [phisicalType, updatePhisicalType] = useState("");
  const [duration, updateDuration] = useState("");
  const [distance, updateDistance] = useState("");
  const [effort, updateEffort] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submitNewCampaign = (e) => {
    dispatch(addActivityAction({
        type,
        username,
        title,
        url,
        comment,
        text,
        phisicalType,
        duration,
        distance,
        effort
    }, handleRedirect.bind(this)));
  };

  const handleRedirect = () => {
    setRedirect(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitNewCampaign();    
  }

  return (
    <Paper className={classes.container}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Typography variant="h5" >
          <Box fontWeight="fontWeightBold" mb={1}>
            {title}
          </Box>
        </Typography>
        <Divider orientation="horizontal" />
        <Box display="flex" flexDirection="row">
          <Box display="flex" flexDirection="column" flex={3} mr={2} mt={2}>
            <Typography variant="body2" style={{ fontWeight: "bold", marginBottom: 16 }}>
              Detalle de actividad
            </Typography>

            <Box display="flex" flexDirection="row" mb={2}>
            <TextField
              style={{ marginBottom: 16 }}
              label="Título"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => updateTitle(e.target.value)} />
            </Box>  

            <InputLabel style={{ marginBottom: 16 }} id="labelTipo">Tipo</InputLabel>
            <Select displayEmpty variant="outlined"
                labelId="labelTipo"
                value={type } onChange={(e) => updateType(e.target.value)}>
                <MenuItem value={"photo"}>Foto</MenuItem>
                <MenuItem value={"publication"}>Publicación</MenuItem>
                <MenuItem value={"phisical"}>Física</MenuItem>
            </Select>

            <Box display="flex" flexDirection="row" mb={2}>
              
              </Box>   
            <Box display="flex" flexDirection="row" mb={2}>
            <TextField
              style={{ marginBottom: 16 }}
              label="Usuario"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => updateUsername(e.target.value)} />
            </Box>  
            {type==='photo' ?
            (
              <Box display="flex" flexDirection="row" mb={2}>
                <TextField
              style={{ margin: 16 }}
              label="URL"
              variant="outlined"
              fullWidth
              value={url}
              onChange={(e) => updateUrl(e.target.value)} />
                <TextField
              style={{ margin: 16 }}
              label="Comentario"
              variant="outlined"
              fullWidth
              value={comment}
              onChange={(e) => updateComment(e.target.value)} />
              </Box>  
            ):
            (null)
            }  
            {type==='publication' ?
            (
              <Box display="flex" flexDirection="row" mb={2}>
                <TextField
              style={{ margin: 16 }}
              label="Texto"
              variant="outlined"
              fullWidth
              value={text}
              onChange={(e) => updateText(e.target.value)} />
            </Box>  
            ):
            (null)
            }  
            {type==='phisical' ?
            (
              <Fragment>
                <InputLabel style={{ margin: 16 }} id="labelTipoActividad">Tipo actividad física</InputLabel>
            <Select style={{ margin: 16 }} variant="outlined"
                labelId="labelTipoActividad"
                value={phisicalType} onChange={(e) => updatePhisicalType(e.target.value)}>
                <MenuItem value={"Carrera"}>Carrera</MenuItem>
                <MenuItem value={"Natacion"}>Natación</MenuItem>
                <MenuItem value={"Ciclismo"}>Ciclismo</MenuItem>
                <MenuItem value={"Otra"}>Otra</MenuItem>
            </Select>
            <Box display="flex" flexDirection="row" mb={2}>              
              </Box>   
              <Box display="flex" flexDirection="row" mb={2}>
                
                <TextField
              style={{ margin: 16 }}
              label="Duración"
              variant="outlined"
              fullWidth
              value={duration}
              onChange={(e) => updateDuration(e.target.value)} />
                <TextField
              style={{ margin: 16 }}
              label="Distancia"
              variant="outlined"
              fullWidth
              value={distance}
              onChange={(e) => updateDistance(e.target.value)} />
            
            </Box>  
            <InputLabel style={{ margin: 16 }} id="labelEsfuerzo">Esfuerzo</InputLabel>
            <Select style={{ margin: 16 }} displayEmpty variant="outlined"
                labelId="labelEsfuerzo"
                value={effort} onChange={(e) => updateEffort(e.target.value)}>
                <MenuItem value={"Bajo"}>Bajo</MenuItem>
                <MenuItem value={"Medio"}>Medio</MenuItem>
                <MenuItem value={"Alto"}>Alto</MenuItem>
            </Select>
            </Fragment>
            ):
            (null)
            }  
            <Box display="flex" flexDirection="row" mb={2}>
              
            </Box>            
            <Box display="flex" flexDirection="row" mt={2} justifyContent="flex-start">
              <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#FC6100', height: 56, marginRight: 8 }}>
                Guardar Actividad
              </Button>
              <Button variant="contained" color="default" style={{ height: 56 }} onClick={() => history.goBack()}>
                Cancelar
              </Button>
            </Box>
          </Box>          
        </Box>
      </form>
      {redirect && <Redirect to={"/activities"} />}
    </Paper>
  );
};

export default NewActivity;
